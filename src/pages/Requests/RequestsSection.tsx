import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Box, Icon, Pill, RequestSkeleton, Text } from '~/components';

import { copyData, fontSize, statusMsg, truncateString, getTheme, getDate, timeAgo, MOBILE_MAX_WIDTH } from '~/utils';
import { RequestData } from '~/types';
import { useStateContext } from '~/hooks';
import { SIcon } from './RequestsDetails/Details';

interface Items {
  value: string;
  itemsCopied: boolean[];
}

interface RequestSectionProps {
  requests: RequestData[];
  loading: boolean;
  error: boolean;
}

export const RequestSection = ({ requests, loading, error }: RequestSectionProps) => {
  const navigate = useNavigate();
  const { setSelectedRequest, theme, setLoading } = useStateContext();
  const currentTheme = getTheme(theme);
  const [items, setItems] = useState<Items[]>([]);

  const handleClick = (request: RequestData) => {
    setSelectedRequest(request);
    setLoading(false);
    navigate(`/requests/${request.nonce}`);
  };

  const handleCopy = async (content: string, index: number, item: number) => {
    copyData(content);
    const newItems = [...items];
    newItems[index].itemsCopied[item] = true;
    setItems(newItems);

    setTimeout(() => {
      const newItems = [...items];
      newItems[index].itemsCopied[item] = false;
      setItems(newItems);
    }, 800);
  };

  useEffect(() => {
    if (requests.length) setItems(requests.map((request) => ({ value: request.id, itemsCopied: [false, false] })));
  }, [requests]);

  return (
    <RequestsSection>
      {!!requests.length &&
        requests.map((card, index) => (
          <Card onClick={() => handleClick(card)} key={card.id + index}>
            {/* Header section */}
            <PillsContainer>
              <Pill
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(card.id, index, 0);
                }}
                iconName='hashtag'
                size='1.2rem'
                text={truncateString(card.id, 9)}
                copy
                clickable
                copied={items[index]?.itemsCopied[0]}
              />
              <Pill iconName={card.status} text={statusMsg(card.status)} size='1.3rem' />
            </PillsContainer>
            {/* Request number */}
            <RequestTitle data-testid='request-card'>Request #{card.nonce}</RequestTitle>

            {/* Requester section */}
            <DataContainer
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(card.requester, index, 1);
              }}
            >
              <SBox>
                <SecondaryText>By</SecondaryText>
                <PrimaryText>{truncateString(card.requester, 4)}</PrimaryText>
                {!items[index]?.itemsCopied[1] && <Icon name='copy' size='1.2rem' />}
                {items[index]?.itemsCopied[1] && <SIcon name='copy-success' size='1.2rem' />}
              </SBox>
            </DataContainer>

            {/* Description */}
            <DescriptionContainer>
              <SecondaryText className='multiline-ellipsis'>{card.description}</SecondaryText>
            </DescriptionContainer>

            {/* Footer section */}
            <CardFooter>
              <DataContainer>
                <PrimaryText data-tooltip-id='opoo-tooltip' data-tooltip-content={getDate(card.createdAt)}>
                  {timeAgo(card.createdAt)}
                </PrimaryText>
              </DataContainer>
              <DetailsButton onClick={() => setSelectedRequest(card)}>
                <Icon name='right-arrow' size='0.9rem' />
              </DetailsButton>
            </CardFooter>
          </Card>
        ))}

      {loading && <RequestSkeleton count={9} theme={currentTheme} />}

      {!loading && error && !requests.length && <Text>Something went wrong</Text>}
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
  justify-content: center;
  align-content: baseline;
  align-items: start;
  min-height: 80vh;
  height: 100%;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.border};
  width: 40.6rem;
  height: 21.2rem;
  gap: 1rem;
  padding: 2rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundActive};
    transition: all 0.2s ease-in-out;
  }
`;

const DataContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;
`;

const DescriptionContainer = styled(DataContainer)`
  height: 4.8rem;
  align-items: start;
  overflow: hidden;

  p {
    font-size: ${fontSize.MEDIUM};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 0;
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
  line-height: 1.6rem; /* 140% */

  /* Multiline ellipsis */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* start showing ellipsis when 3rd line is reached */
  white-space: pre-wrap; /* let the text wrap preserving spaces */
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
`;

const SBox = styled(Box)`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 0.6rem;

  i {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover i {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  p {
    display: inline-block;
    width: fit-content;
  }
`;

// ------------------------------- Footer Section ------------------------------- //
export const DetailsButton = styled.button`
  background-color: ${({ theme: { detailsBackground } }) => detailsBackground};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  padding: 0.8rem;
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
