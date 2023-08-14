import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, formatRequestsData, getRequestEnsNames } from '~/utils';
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
  // temporary:
  const MOST_RECENT_REQUEST_NONCE = 242;
  const REQUESTS_AMOUNT = 9; // the max amount of requests that can be loaded at once

  const { opooSdk, client } = useOpooSdk();
  const { requests /* filters */, setRequests, setLoading, loading } = useStateContext();
  const [lastRequestNonce, setLastRequestNonce] = useState(MOST_RECENT_REQUEST_NONCE);

  const getRequests = async () => {
    setLoading(true);
    // temporary logs
    console.log('loading requests...');
    try {
      /* 
        temporary: delete this when `opooSdk.helpers.totalRequestCount()` works
        it will need a new deployment
      */
      // const requestCount = await opooSdk.helpers.listRequests(0, 1000);
      // console.log('requests count:', requestCount.length);
      const rawRequests = await opooSdk.batching.getFullRequestData(lastRequestNonce, REQUESTS_AMOUNT);

      const ensNames = await getRequestEnsNames(rawRequests, client);
      const returnedTypes = await opooSdk.ipfs.getReturnedTypes(
        // temporary: use the commented line below when the sdk is updated (+ new deployment)
        /* rawRequests[rawRequests.length - 1].request.ipfsHash */ '0xb253c6667c1658ebcb3c5ad11183cea14e6e527bd31e18e3091538f399890e45',
        //                                                                   ^ NOTE: this is not a private key, it's a ipfsHash
      );
      const formattedRequests = formatRequestsData(rawRequests, ensNames, returnedTypes);

      console.log('opooSdk', opooSdk);
      console.log('ensNames', ensNames);
      console.log('rawFulRequests', rawRequests);
      console.log('returnedTypes', returnedTypes);
      setLastRequestNonce(lastRequestNonce - REQUESTS_AMOUNT);
      setLoading(false);

      return formattedRequests;
    } catch (error) {
      console.error('Error loading requests:', error);
      setLoading(false);
      return [];
    }
  };

  const handleScroll = async () => {
    // diff between the bottom of the page and the user's current position
    const diff = document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop;

    // if the user is not at the bottom of the page, or if the requests are still loading, do nothing
    if (diff > 100 || loading) return;

    const newRequests = await getRequests();
    setRequests([...requests, ...newRequests]);
  };

  useEffect(() => {
    // infinite scroll implementation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    getRequests().then((newRequests) => {
      setRequests([...requests, ...newRequests]);
    });
  }, []);

  return (
    <Layout>
      <Container>
        <Title>Requests</Title>

        {/* <FiltersSection filters={filters} /> */}

        <RequestSection requests={requests} loading={loading} />
      </Container>
    </Layout>
  );
};
