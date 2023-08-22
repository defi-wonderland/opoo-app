import { useState } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, TABLET_MAX_WIDTH, copyData, getDate, statusMsg, truncateString } from '~/utils';
import { Title, Box, Text, Icon, DetailsSkeleton, ExternalLink } from '~/components';
import { RequestData, Theme } from '~/types';

interface DetailsProps {
  selectedRequest?: RequestData;
  loading?: boolean;
  theme: Theme;
}

export const Details = ({ selectedRequest, theme, loading }: DetailsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    copyData(selectedRequest?.id || '');
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  return (
    <SBox>
      <Title data-testid='request-page-title'>Request #{selectedRequest?.nonce}</Title>

      <DetailsContainer>
        {!loading && selectedRequest?.nonce && (
          <>
            <SDataContainer>
              <Text>By</Text>
              <Text className='ellipsis'>
                <ExternalLink href={`https://optimistic.etherscan.io/address/${selectedRequest.requester}`}>
                  {selectedRequest.requester}
                </ExternalLink>
              </Text>
            </SDataContainer>

            <SDataContainer>
              <Text>Description</Text>
              <Text>{selectedRequest.description}</Text>
            </SDataContainer>

            <SDataContainer>
              <Text>ID</Text>
              <IdData onClick={handleCopy}>
                <Text>{truncateString(selectedRequest.id, 9)}</Text>
                {!copied && <Icon name='copy' size='1.2rem' />}
                {copied && <SIcon name='copy-success' size='1.2rem' />}
              </IdData>
            </SDataContainer>

            <SDataContainer>
              <Text>Created at</Text>
              <Text>{getDate(selectedRequest.createdAt)}</Text>
            </SDataContainer>

            <SDataContainer>
              <Text>Status</Text>
              <StatusContainer>
                <Icon name={selectedRequest.status} size='1.3rem' />
                <Text>{statusMsg(selectedRequest.status)}</Text>
              </StatusContainer>
            </SDataContainer>
          </>
        )}

        {loading && <DetailsSkeleton theme={theme} />}
      </DetailsContainer>
    </SBox>
  );
};

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 12rem 8rem 8rem;

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    padding-top: 12rem;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 12rem 3rem 3rem;
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
    border: ${({ theme }) => theme.border};
    margin-top: 2rem;
    padding: 2rem;
  }
`;

const SDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: start;
  padding: 0.5rem 0;

  p:nth-child(1) {
    color: ${({ theme }) => theme.textSecondary};
    width: 14rem;
    min-width: 14rem;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    p:nth-child(1) {
      width: 8rem;
      min-width: 8rem;
    }

    p {
      /* inline-size: 23rem; */
      overflow-wrap: break-word;
    }
  }
`;

const IdData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  i {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover i {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  p:nth-child(1) {
    color: ${({ theme }) => theme.textPrimary};
    display: inline-block;
    width: unset;
  }
`;

export const SIcon = styled(Icon)`
  opacity: 1 !important;
`;

const StatusContainer = styled(Box)`
  align-items: center;
  justify-content: start;
  gap: 0.6rem;
  flex-direction: row;
`;
