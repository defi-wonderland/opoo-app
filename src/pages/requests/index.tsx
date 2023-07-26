import styled from 'styled-components';

import { RequestSection } from './RequestsSection';
import { FiltersSection } from './FiltersSection';
import { CardData, Filter } from '~/types';

const Layout = styled.div`
  width: 100%;
  background-color: #f1f1f1;
  padding: 12rem 8rem;
`;

const Container = styled.div`
  max-width: 128rem;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #ff0420;
  font-family: Rubik;
  font-size: 52px;
  font-style: italic;
  font-weight: 600;
  line-height: 64px;
`;

// temporary fixed values
const cardData: CardData = {
  description: 'Will a fourth US bank fail by June 30?',
  id: '3d4919c6b9...f368ae1ec2',
  createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
  requester: '0x388c818c...ccb19297',
};

const requests: CardData[] = [
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
  cardData,
];

const filters: Filter[] = [
  { text: 'Satus', icon: 'status' },
  { text: 'All' },
  { text: 'Created date', icon: 'created-date' },
  { text: 'less than' },
  { text: '3 days ago' },
  { text: 'Requester', icon: 'requester' },
  { text: 'search result' },
  { text: 'ID', icon: 'tag' },
  { text: 'search result' },
  { icon: 'close' },
];

export const Requests = () => {
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
