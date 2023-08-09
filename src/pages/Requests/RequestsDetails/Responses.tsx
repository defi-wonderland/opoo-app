import styled from 'styled-components';

import { Title, Box, Text } from '~/components';
import { MOBILE_MAX_WIDTH, fontSize } from '~/utils';

interface ResponsesProps {
  responses: string[][];
}
export const Responses = ({ responses }: ResponsesProps) => {
  const tableData = {
    columns: ['Response', 'Proposer', 'ID', 'Dispute'],
    rows: responses,
  };

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
                  <SBox key={value + index}>
                    <TableTitle>{tableData.columns[index]}</TableTitle>
                    <SText>{value}</SText>
                  </SBox>
                ))}
              </Row>
            ))}

          {!tableData.rows?.length && (
            <Row>
              <MessageText>There are no responses yet</MessageText>
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
  gap: 0.6rem;
  padding: 1.2rem 3rem;

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

const SText = styled(Text).attrs({ className: 'ellipsis' })`
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
