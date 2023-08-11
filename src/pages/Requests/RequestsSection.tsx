import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { copyData, fontSize, statusMsg, truncateString, getTheme } from '~/utils';
import { Icon, SLink, Pill, RequestSkeleton } from '~/components';
import { Items, RequestData } from '~/types';
import { useStateContext } from '~/hooks';

interface RequestSectionProps {
  requests: RequestData[];
}

export const RequestSection = ({ requests }: RequestSectionProps) => {
  const { setSelectedRequest, theme } = useStateContext();
  const currentTheme = getTheme(theme);
  const [items, setItems] = useState<Items[]>([]);

  const handleCopy = async (content: string, index: number) => {
    copyData(content);
    const newItems = [...items];
    newItems[index].itemCopied = true;
    setItems(newItems);

    setTimeout(() => {
      const newItems = [...items];
      newItems[index].itemCopied = false;
      setItems(newItems);
    }, 800);
  };

  useEffect(() => {
    if (requests.length) setItems(requests.map((request) => ({ value: request.id, itemCopied: false })));
  }, [requests]);

  return (
    <RequestsSection>
      {!!requests.length &&
        requests.map((card, index) => (
          <SLink to={`/requests/${card.nonce}`} key={card.id + index}>
            <Card onClick={() => setSelectedRequest(card)}>
              {/* Header section */}
              <PillsContainer>
                <Pill
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy(card.id, index);
                  }}
                  iconName='hashtag'
                  size='1.2rem'
                  text={truncateString(card.id, 9)}
                  copy
                  copied={items[index]?.itemCopied}
                  clickable
                />
                <Pill iconName={card.status} text={statusMsg(card.status)} size='1.3rem' />
              </PillsContainer>
              {/* Request number */}
              <RequestTitle>Request #{card.nonce}</RequestTitle>

              {/* Requester section */}
              <DataContainer>
                <SecondaryText>By</SecondaryText>
                <PrimaryText>{truncateString(card.requester, 4)}</PrimaryText>
              </DataContainer>

              {/* Description */}
              <DescriptionContainer>
                <SecondaryText>{card.description}</SecondaryText>
              </DescriptionContainer>

              {/* Footer section */}
              <CardFooter>
                <DataContainer>
                  <PrimaryText>{card.createdAt}</PrimaryText>
                </DataContainer>
                <DetailsButton onClick={() => setSelectedRequest(card)}>
                  <p>See details</p>
                  <Icon name='right-arrow' size='0.9rem' />
                </DetailsButton>
              </CardFooter>
            </Card>
          </SLink>
        ))}

      {!requests.length && <RequestSkeleton count={9} theme={currentTheme} />}
    </RequestsSection>
  );
};

const RequestsSection = styled.section`
  margin-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: start;
  align-items: start;
`;

export const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.border};
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
    font-size: ${fontSize.MEDIUM};
  }
`;

const PrimaryText = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  text-align: right;
  font-family: 'Open Sans';
  font-size: ${fontSize.SMALL};
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 140% */
`;

export const SecondaryText = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Open Sans';
  font-size: ${fontSize.SMALL};
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

// ------------------------------- Mid Section ------------------------------- //
const RequestTitle = styled.h1`
  color: ${({ theme }) => theme.textPrimary};
  font-family: 'Open Sans';
  font-size: ${fontSize.LARGE};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 1rem 0;
`;

// ------------------------------- Footer Section ------------------------------- //
const DetailsButton = styled.button`
  background-color: ${({ theme: { detailsBackground } }) => detailsBackground};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  height: 24px;
  padding: 4px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-size: ${fontSize.SMALL};
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
