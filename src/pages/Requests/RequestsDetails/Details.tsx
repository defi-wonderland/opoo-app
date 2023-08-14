import { useState } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, copyData, statusMsg, truncateString } from '~/utils';
import { Title, Box, Text, Pill, Icon } from '~/components';
import { RequestData } from '~/types';

interface DetailsProps {
  selectedRequest?: RequestData;
}

export const Details = ({ selectedRequest }: DetailsProps) => {
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
      <Title>Request #{selectedRequest?.nonce}</Title>

      <DetailsContainer>
        <SDataContainer>
          <Text>Description</Text>
          <Text>{selectedRequest?.description || 'N/A'}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>ID</Text>
          <IdData onClick={handleCopy}>
            <Text>{truncateString(selectedRequest?.id || '', 9)}</Text>
            <Icon name={copied ? 'copy-success' : 'copy'} size='1.2rem' />
          </IdData>
        </SDataContainer>

        <SDataContainer>
          <Text>Created at</Text>
          <Text>{selectedRequest?.createdAt}</Text>
        </SDataContainer>

        <SDataContainer>
          <Text>Status</Text>
          <Pill
            iconName={selectedRequest?.status || 'unanswered'}
            text={statusMsg(selectedRequest?.status || 'unanswered')}
            fontSize='1.3rem'
            clickable
          />
        </SDataContainer>
      </DetailsContainer>
    </SBox>
  );
};

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 4rem 8rem 8rem;

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
      width: 6.5rem;
      min-width: 6.5rem;
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

  p:nth-child(1) {
    display: inline-block;
    width: unset;
  }
`;
