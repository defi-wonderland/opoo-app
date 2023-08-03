import styled from 'styled-components';

import { Title, Box, Text, Pill, Icon } from '~/components';
import { MOBILE_MAX_WIDTH, statusMsg } from '~/utils';
import { useStateContext } from '~/hooks';

interface DetailsProps {
  id?: string;
}

export const Details = ({ id }: DetailsProps) => {
  const { selectedRequest } = useStateContext();

  return (
    <SBox>
      <Title>Request #{id}</Title>

      <DetailsContainer>
        <SDataContainer>
          <Text>Description:</Text>
          <Text>{selectedRequest?.description}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>ID: </Text>
          <Text>{selectedRequest?.id}</Text>
          <Icon name='copy' size='1.2rem' />
        </SDataContainer>

        <SDataContainer>
          <Text>Created at:</Text>
          <Text>{selectedRequest?.createdAt}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>Status:</Text>
          <Pill iconName={selectedRequest.status} text={statusMsg(selectedRequest.status)} fontSize='1.3rem' />
        </SDataContainer>
      </DetailsContainer>
    </SBox>
  );
};

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};

  padding: 4rem 8rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 8rem 3rem 3rem;
  }
`;

const DetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};

  margin-top: 3rem;
  width: 100%;
  border-radius: 20px;
  padding: 3rem;

  div:last-child {
    border-bottom: unset;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 2rem;
  }
`;

const SDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: 0.5rem 0;

  p:nth-child(1) {
    width: 14rem;
    min-width: 14rem;
    color: #99a4b8;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    p:nth-child(1) {
      width: 6.5rem;
      min-width: 6.5rem;
    }

    p {
      /* inline-size: 23rem; */
      overflow-wrap: break-word;
    }
  }
`;
