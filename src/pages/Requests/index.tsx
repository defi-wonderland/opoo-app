import { useEffect } from 'react';
import styled from 'styled-components';

import { RequestSection } from './RequestsSection';
// import { FiltersSection } from './FiltersSection';
import { Title } from '~/components';
import { useOpooSdk, useStateContext } from '~/hooks';
import { MOBILE_MAX_WIDTH } from '~/utils';

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
  const { requests /* filters */ } = useStateContext();

  const { opooSdk } = useOpooSdk();

  // temporary log
  useEffect(() => {
    console.log(opooSdk);
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
