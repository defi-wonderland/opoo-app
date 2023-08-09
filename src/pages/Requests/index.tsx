import { useEffect } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, formatRequestsData } from '~/utils';
import { useOpooSdk, useStateContext } from '~/hooks';
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
  const { requests /* filters */, setRequests, setLoading } = useStateContext();

  const { opooSdk } = useOpooSdk();

  const getRequests = async () => {
    setLoading(true);
    // temporary logs
    console.log('loading requests...');
    try {
      const rawRequests = await opooSdk.batching.getFullRequestData(128, 9);
      const formattedRequests = await formatRequestsData(rawRequests, opooSdk);

      console.log('opooSdk', opooSdk);
      console.log('rawFulRequests', rawRequests);

      setLoading(false);
      return formattedRequests;
    } catch (error) {
      console.error('Error loading requests:', error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    getRequests().then((requests) => setRequests(requests));
  }, []);

  return (
    <Layout>
      <Container>
        <Title>Requests</Title>

        {/* <FiltersSection filters={filters} /> */}

        <RequestSection requests={requests} />
      </Container>
    </Layout>
  );
};
