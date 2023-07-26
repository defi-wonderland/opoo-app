import styled from 'styled-components';

import { CardData } from '~/types';

export const RequestsSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;

  p,
  span {
    display: inline-block;
    font-family: Open Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 40.6rem;
  height: 16rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  padding: 2rem 3rem;
`;

interface RequestSectionProps {
  requests: CardData[];
}

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

export const RequestSection = ({ requests }: RequestSectionProps) => {
  return (
    <>
      <RequestsSection>
        {requests.map((card) => (
          <Card key={card.id}>
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
        ))}
      </RequestsSection>
    </>
  );
};
