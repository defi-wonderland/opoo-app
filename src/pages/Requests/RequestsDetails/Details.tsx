import styled from 'styled-components';

import { Title, Box, Text } from '~/components';
import { useStateContext } from '~/hooks';
import { MOBILE_MAX_WIDTH } from '~/utils';

const SBox = styled(Box)`
  background-color: ${({ theme: { type, backgroundPrimary, backgroundSecondary } }) =>
    type !== 'light' ? backgroundSecondary : backgroundPrimary};
  padding: 12rem 8rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 8rem 3rem 3rem;
  }
`;

const DetailsContainer = styled.div`
  margin-top: 3rem;
  width: 100%;

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
    width: 31rem;
    min-width: 31rem;
  }

  border-bottom: 1px solid #d9d9d9;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    p:nth-child(1) {
      width: 6.5rem;
      min-width: 6.5rem;
    }

    p {
      inline-size: 23rem;
      overflow-wrap: break-word;
    }
  }
`;

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
          <Text>Requester: </Text>
          <Text>{selectedRequest?.requester}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>Created at:</Text>
          <Text>{selectedRequest?.createdAt}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>Transaction:</Text>
          <Text>{selectedRequest?.transaction}</Text>
        </SDataContainer>
      </DetailsContainer>
    </SBox>
  );
};
