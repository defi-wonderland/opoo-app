import { useEffect } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, formatRequestsData, getMetadatas, getRequestEnsNames, getRawRequests } from '~/utils';
import { useOpooSdk, useStateContext, InfiniteScroll } from '~/hooks';
import { RequestSection } from './RequestsSection';
import { Title } from '~/components';
// import { FiltersSection } from './FiltersSection';

const Layout = styled.div`
  background-color: ${({ theme: { iconBackground } }) => iconBackground};
  width: 100%;
  padding: 20rem 8rem 10rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 12rem 1.6rem 0;
  }
`;

const Container = styled.div`
  background-color: ${({ theme: { iconBackground } }) => iconBackground};
  max-width: 128rem;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
`;

export const Requests = () => {
  const { opooSdk, client } = useOpooSdk();
  const {
    requests,
    setRequests,
    setLoading,
    loading,
    setIsError,
    isError,
    totalRequestCount,
    setTotalRequestCount,
    requestAmount,
    setRequestAmount,
  } = useStateContext();

  const getRequests = async (totalRequestCount: number, requestAmount: number) => {
    setLoading(true);
    console.log('loading requests from:', totalRequestCount, 'to:', totalRequestCount + requestAmount, '...');
    try {
      if (requestAmount === 0) {
        setLoading(false);
        return [];
      }

      const rawRequests = await getRawRequests(opooSdk, totalRequestCount, requestAmount);

      const ensNamesPromise = getRequestEnsNames(rawRequests, client);
      const metadatasPromise = getMetadatas(rawRequests, opooSdk);

      const [ensNames, metadatas] = await Promise.all([ensNamesPromise, metadatasPromise]);

      const formattedRequests = formatRequestsData(rawRequests, ensNames, metadatas);

      const newTotalRequestCount = totalRequestCount - requestAmount;
      if (newTotalRequestCount > 0) setTotalRequestCount(newTotalRequestCount);

      setRequestAmount(requestAmount);
      setLoading(false);
      return formattedRequests;
    } catch (error) {
      console.error('Error loading requests:', error);
      setLoading(false);
      return [];
    }
  };

  const updateRequests = async () => {
    if (!totalRequestCount) return;
    const newRequests = await getRequests(totalRequestCount, requestAmount);
    setRequests([...requests, ...newRequests]);
  };

  const handleLoad = async () => {
    try {
      if (!totalRequestCount) {
        setLoading(true);
        console.log('getting last request nonce...');
        const totalRequestCount = await opooSdk.helpers.totalRequestCount();

        // if the request amount is bigger than the total request count, we set the request amount to the total request count
        const newRequestAmount = requestAmount < Number(totalRequestCount) ? requestAmount : Number(totalRequestCount);

        console.log('last request nonce:', totalRequestCount);
        const newRequests = await getRequests(Number(totalRequestCount) - newRequestAmount, newRequestAmount);
        setRequests([...requests, ...newRequests]);
      }
    } catch (error) {
      console.error('Error getting last requests:', error);
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Layout>
      <Container>
        <Title data-testid='requests-page-title'>Requests</Title>

        {/* <FiltersSection filters={filters} /> */}

        <RequestSection requests={requests} loading={loading} error={isError} />
        <InfiniteScroll update={updateRequests} loading={loading} />
      </Container>
    </Layout>
  );
};
