import styled from 'styled-components';

import { RequestSection } from './RequestsSection';
import { FiltersSection } from './FiltersSection';
import { Title } from '~/components';
import { useStateContext } from '~/hooks';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  width: 100%;
  padding: 12rem 8rem;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  max-width: 128rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const Requests = () => {
  const { requests, filters } = useStateContext();
  return (
    <Layout>
      <Container>
        <Title>Requests</Title>
        <FiltersSection filters={filters} />
        <RequestSection requests={requests} />
      </Container>
    </Layout>
  );
};
