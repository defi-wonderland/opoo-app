import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, REQUESTS_AMOUNT, formatRequestsData, getMetadatas, getRequestEnsNames } from '~/utils';
import { useOpooSdk, useStateContext, InfiniteScroll } from '~/hooks';
import { RequestSection } from './RequestsSection';
import { Title } from '~/components';
// import { FiltersSection } from './FiltersSection';

const Layout = styled.div`
  background-color: ${({ theme: { iconBackground } }) => iconBackground};
  width: 100%;
  padding: 12rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 12rem 1.6rem 0;
  }
`;

const Container = styled.div`
  background-color: ${({ theme: { iconBackground } }) => iconBackground};
  max-width: 128rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const Requests = () => {
  const { opooSdk, client } = useOpooSdk();
  const { requests /* filters */, setRequests, setLoading, loading, setIsError, isError } = useStateContext();
  const [lastRequestNonce, setLastRequestNonce] = useState<number | undefined>();

  const getRequests = async (lastRequestNonce: number) => {
    setLoading(true);
    console.log('loading requests...');
    try {
      const rawRequests = await opooSdk.batching.getFullRequestData(lastRequestNonce, REQUESTS_AMOUNT);
      console.log('rawFulRequests', rawRequests);

      const ensNames = await getRequestEnsNames(rawRequests, client);
      console.log('ensNames', ensNames);

      const metadatas = await getMetadatas(rawRequests, opooSdk);
      console.log('metadatas', metadatas);

      const formattedRequests = formatRequestsData(rawRequests, ensNames, metadatas);

      console.log('opooSdk', opooSdk);
      setLastRequestNonce(lastRequestNonce - REQUESTS_AMOUNT);
      setLoading(false);

      return formattedRequests;
    } catch (error) {
      console.error('Error loading requests:', error);
      setLoading(false);
      return [];
    }
  };

  const updateRequests = async () => {
    if (!lastRequestNonce) return;
    const newRequests = await getRequests(lastRequestNonce);
    setRequests([...requests, ...newRequests]);
  };

  const handleLoad = async () => {
    try {
      if (!lastRequestNonce) {
        setLoading(true);
        console.log('getting last request nonce...');
        const lastRequestNonce = await opooSdk.helpers.totalRequestCount();

        console.log('last request nonce:', lastRequestNonce);
        const newRequests = await getRequests(Number(lastRequestNonce) - REQUESTS_AMOUNT);
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
        <Title>Requests</Title>

        {/* <FiltersSection filters={filters} /> */}

        <RequestSection requests={requests} loading={loading} error={isError} />
        <InfiniteScroll update={updateRequests} loading={loading} />
      </Container>
    </Layout>
  );
};
