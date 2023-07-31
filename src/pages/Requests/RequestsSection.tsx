import styled from 'styled-components';

import { SLink, StatusIcon as Icon } from '~/components';
import { useStateContext } from '~/hooks';
import { RequestData } from '~/types';

export const RequestsSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;

  p,
  span {
    color: ${({ theme }) => theme.textPrimary};
    font-family: ${({ theme }) => theme.textFontFamily};
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  max-width: 40.6rem;
  height: 16rem;
  padding: 2rem 3rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  height: 3rem;
  span {
    width: 8rem;
  }
`;

export const StatusIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
`;

interface RequestSectionProps {
  requests: RequestData[];
}

export const RequestSection = ({ requests }: RequestSectionProps) => {
  const { setSelectedRequest } = useStateContext();

  return (
    <RequestsSection>
      {requests.map((card, index) => (
        <SLink to={`/requests/${card.id}`} key={card.id + index} onClick={() => setSelectedRequest(card)}>
          <Card>
            <StatusIcon name={`status-${card.status}`} color={card.status} size='2.4rem' />
            <DataContainer>
              <span>Description:</span>
              <p>{card.description}</p>
            </DataContainer>

            <DataContainer>
              <span>ID:</span>
              <p>{card.id}</p>
            </DataContainer>

            <DataContainer>
              <span>Created at:</span>
              <p>{card.createdAt}</p>
            </DataContainer>

            <DataContainer>
              <span>Requester: </span>
              <p>{card.requester}</p>
            </DataContainer>
          </Card>
        </SLink>
      ))}
    </RequestsSection>
  );
};
