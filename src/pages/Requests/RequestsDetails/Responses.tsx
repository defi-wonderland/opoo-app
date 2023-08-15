import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Title, Box, Text, ExternalLink, Icon } from '~/components';
import { MOBILE_MAX_WIDTH, fontSize, truncateString, copyData } from '~/utils';
import { Items, Response } from '~/types';

interface ResponsesProps {
  responses: Response[];
  loading: boolean;
}

export const Responses = ({ responses, loading }: ResponsesProps) => {
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

  const formattedResponses = responses?.map((response, index) => [
    // Response:
    response.response,

    // Proposer:
    <ExternalLink key={'address-link-' + index} href={`https://optimistic.etherscan.io/address/${response.proposer}`}>
      {truncateString(response.proposer, 4)}
    </ExternalLink>,

    // Request Id:
    <Id key={'request-id-' + index} onClick={() => handleCopy(response.requestId, index)}>
      {truncateString(response.requestId, 4)}
      <Icon name={items[index]?.itemCopied ? 'copy-success' : 'copy'} size='1.2rem' />
    </Id>,

    // Dispute:
    response.dispute,
  ]);

  const tableData = {
    columns: ['Response', 'Proposer', 'ID', 'Dispute'],
    rows: formattedResponses,
  };

  useEffect(() => {
    if (responses?.length) setItems(responses?.map((response) => ({ value: response.response, itemCopied: false })));
  }, [responses]);

  return (
    <ResponsesContainer>
      <Title>Proposed Responses</Title>
      <TableContainer>
        {/* Column Titles */}
        <ColumnTitles>
          {tableData.columns.map((column, index) => (
            <Box key={column + index}>
              <TableTitle>{column}</TableTitle>
            </Box>
          ))}
        </ColumnTitles>

        <Rows>
          {/* Row Values */}
          {!!tableData.rows?.length &&
            tableData.rows.map((rows, index) => (
              <Row key={'row-' + index}>
                {rows.map((value, index) => (
                  <SBox key={'row-element-' + index}>
                    <TableTitle>{tableData.columns[index]}</TableTitle>
                    <SText>{value}</SText>
                  </SBox>
                ))}
              </Row>
            ))}

          {!tableData.rows?.length && (
            <Row>
              <MessageText>{loading ? 'Loading responses...' : 'There are no responses yet'}</MessageText>
            </Row>
          )}
        </Rows>
      </TableContainer>
    </ResponsesContainer>
  );
};

const ResponsesContainer = styled(Box)`
  background-color: ${({ theme: { backgroundSecondary } }) => backgroundSecondary};
  padding: 8rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: ${({ theme: { backgroundPrimary } }) => backgroundPrimary};
    padding: 3rem 3rem;
  }
`;

const Row = styled(Box)`
  background-color: ${({ theme: { backgroundPrimary } }) => backgroundPrimary};
  flex-direction: row;
  gap: 2rem;
  padding: 1.2rem 3rem;

  div:nth-child(1) {
    min-width: 30%;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: ${({ theme: { backgroundSecondary } }) => backgroundSecondary};
    border: ${({ theme }) => theme.border};
    flex-wrap: wrap;
    height: auto;
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1.2rem;
  }
`;

const ColumnTitles = styled(Row)`
  background: ${({ theme }) => theme.tableHeaderBackground};
  border: ${({ theme }) => theme.border};
  border-radius: 8px 8px 0px 0px;
  padding-left: 3rem;

  div {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: none;
  }
`;

const Rows = styled(Box)`
  border: ${({ theme }) => theme.border};
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: ${({ theme: { backgroundPrimary } }) => backgroundPrimary};
    border: none;
  }
`;

const SBox = styled(Box)`
  p:nth-child(1) {
    display: none;
  }

  &:nth-child(even) p {
    color: ${({ theme }) => theme.textSecondary};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: row;

    &:nth-child(1) {
      padding-left: 0;
    }
    p:nth-child(1) {
      display: block;
    }

    p:nth-child(2) {
      color: ${({ theme }) => theme.textPrimary};
    }
  }
`;

const TableContainer = styled(Box)`
  margin-top: 5rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: ${({ theme: { backgroundSecondary } }) => backgroundSecondary};
    margin-top: 2rem;
  }
`;

const TableTitle = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${fontSize.MEDIUM};
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 142.857% */
  letter-spacing: 0.56px;
  width: 100%;
  text-align: start;
  font-weight: 600;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    text-align: start;
    width: 20rem;
    font-size: ${fontSize.SMALL};
  }
`;

const SText = styled.div.attrs({ className: 'ellipsis' })`
  color: ${({ theme }) => theme.textSecondary};
  width: 100%;
  text-align: start;
  font-family: Open Sans;
  font-size: ${fontSize.MEDIUM};
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem; /* 133.333% */
  letter-spacing: -0.24px;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  word-break: break-all;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    text-align: start;
    font-size: ${fontSize.SMALL};
  }
`;
const MessageText = styled(SText)`
  text-align: center;
`;

const Id = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  cursor: pointer;
`;
