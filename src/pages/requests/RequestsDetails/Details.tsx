import styled from 'styled-components';

import { Title, Box, Text } from '~/components';

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 12rem 8rem 8rem;
`;

const DetailsContainer = styled.div`
  margin-top: 3rem;
  width: 100%;

  div:last-child {
    border-bottom: unset;
  }
`;

const SDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: 0.5rem 0;

  p:nth-child(1) {
    width: 31rem;
    min-width: 31rem;
  }

  border-bottom: 1px solid #d9d9d9;
`;

interface DetailsProps {
  id?: string;
}

export const Details = ({ id }: DetailsProps) => {
  // TODO: get selectedItem by using react context
  const selectedItem = {
    description: 'Will a fourth US bank fail by June 30?',
    id: '3d4919c6b9f368ae1ec2',
    createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
    requester: 'gigarequester.eth',
    transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
    status: 'red',
  };

  return (
    <SBox>
      <Title>Request #{id}</Title>

      <DetailsContainer>
        <SDataContainer>
          <Text>Description:</Text>
          <Text>{selectedItem.description}</Text>
        </SDataContainer>
        <SDataContainer>
          <Text>Requester: </Text>
          <Text>{selectedItem.requester}</Text>
        </SDataContainer>
        <SDataContainer>
          <Text>Created at:</Text>
          <Text>{selectedItem.createdAt}</Text>
        </SDataContainer>
        <SDataContainer>
          <Text>Transaction:</Text>
          <Text>{selectedItem.transaction}</Text>
        </SDataContainer>
      </DetailsContainer>
    </SBox>
  );
};
