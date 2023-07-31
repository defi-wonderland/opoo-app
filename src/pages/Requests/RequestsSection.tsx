import styled from 'styled-components';

import { Icon, SLink } from '~/components';
import { useStateContext } from '~/hooks';
import { RequestData } from '~/types';

interface RequestSectionProps {
  requests: RequestData[];
}

export const RequestSection = ({ requests }: RequestSectionProps) => {
  const { setSelectedRequest } = useStateContext();

  return (
    <RequestsSection>
      {requests.map((card, index) => (
        <Card key={card.id + index}>
          {/* Header section */}
          <PillsContainer>
            <Pill>
              <Icon name='hashtag' size='1.6rem' />
              <SecondaryText>{card.id}</SecondaryText>
              <Icon name='copy' size='1.2rem' />
            </Pill>
            <Pill>
              <Icon name='message' />
              <SecondaryText>{card.status}</SecondaryText>
            </Pill>
          </PillsContainer>

          {/* Request number */}
          <RequestTitle>Request #{index}</RequestTitle>

          {/* Requester section */}
          <DataContainer>
            <SecondaryText>By</SecondaryText>
            <PrimaryText>{card.requester}</PrimaryText>
          </DataContainer>

          {/* Description */}
          <DescriptionContainer>
            <SecondaryText>{card.description}</SecondaryText>
          </DescriptionContainer>

          {/* Footer section */}
          <CardFooter>
            <DataContainer>
              <PrimaryText>By {card.createdAt}</PrimaryText>
            </DataContainer>
            <SLink to={`/requests/${card.id}`}>
              <DetailsButton onClick={() => setSelectedRequest(card)}>
                <p>See details</p>
                <Icon name='right-arrow' size='1rem' />
              </DetailsButton>
            </SLink>
          </CardFooter>
        </Card>
      ))}
    </RequestsSection>
  );
};

const RequestsSection = styled.section`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 40.6rem;
  height: 21.2rem;
  gap: 1rem;
  padding: 2rem;
`;

const DataContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;
  /* height: 3rem; */
`;

const DescriptionContainer = styled(DataContainer)`
  height: 4.8rem;
  align-items: start;
  margin: 1rem 0;

  p {
    font-size: 1.2rem;
  }
`;

const PrimaryText = styled.p`
  color: #000;
  text-align: right;
  font-family: 'Open Sans';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 140% */
`;

const SecondaryText = styled.p`
  display: inline-block;
  color: #99a4b8;
  font-family: 'Open Sans';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 140% */
`;

// ------------------------------- Header Section ------------------------------- //
const PillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

const Pill = styled.div`
  border: 1px solid rgba(153, 164, 184, 0.1);
  border-radius: 100px;
  width: fit-content;
  padding: 0.4rem 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

// ------------------------------- Mid Section ------------------------------- //
const RequestTitle = styled.h1`
  color: #000;
  font-family: 'Open Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 1rem 0;
`;

// ------------------------------- Footer Section ------------------------------- //
const DetailsButton = styled.button`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: #f4f4f5;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
