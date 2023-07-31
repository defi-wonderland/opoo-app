import styled from 'styled-components';

import { RequestSection } from './RequestsSection';
import { FiltersSection } from './FiltersSection';
import { CardData, Filter } from '~/types';
import { Title } from '~/components';

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

// temporary fixed values
const cardData: CardData[] = [
  {
    description: 'Will a fourth US bank fail by June 30?',
    id: '3d4919c6b9f368ae1ec2',
    createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
    requester: '0x388c818cccb19297',
    status: 'yellow',
  },
  {
    description: 'Will a fourth US bank fail by June 30?',
    id: '3d4919c6b9f368ae1ec2',
    createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
    requester: '0x388c818cccb19297',
    status: 'green',
  },
  {
    description: 'Will a fourth US bank fail by June 30?',
    id: '3d4919c6b9f368ae1ec2',
    createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
    requester: '0x388c818cccb19297',
    status: 'red',
  },
];

const requests: CardData[] = [...cardData, ...cardData, ...cardData, ...cardData];

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
