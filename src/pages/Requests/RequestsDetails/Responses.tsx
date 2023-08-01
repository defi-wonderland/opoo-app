import styled from 'styled-components';

import { Title, Box, Text } from '~/components';
import { MOBILE_MAX_WIDTH } from '~/utils';

export const Responses = () => {
  // temporary fixed values
  const responses = {
    columns: ['Response', 'Proposer', 'ID', 'Dispute'],
    rows: [
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
      ['Yes', 'proposer.wonderland.eth', 'a94fcc042254...2d67d4b5815a', 'Active since May 15, 14:55'],
    ],
  };

  return (
    <ResponsesContainer>
      <Title>Proposed Responses</Title>
      <TableContainer>
        {/* Column Titles */}
        <ColumnTitles>
          {responses.columns.map((column, index) => (
            <Box key={column + index}>
              <TableTitle>{column}</TableTitle>
            </Box>
          ))}
        </ColumnTitles>

        <Rows>
          {/* Row Values */}
          {responses.rows.map((rows, index) => (
            <Row key={'row-' + index}>
              {rows.map((value, index) => (
                <SBox key={value + index}>
                  <TableTitle>{responses.columns[index]}</TableTitle>
                  <SText>{value}</SText>
                </SBox>
              ))}
            </Row>
          ))}
        </Rows>
      </TableContainer>
    </ResponsesContainer>
  );
};

const ResponsesContainer = styled(Box)`
  padding: 8rem 8rem;
  background-color: ${({ theme: { backgroundSecondary } }) => backgroundSecondary};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 3rem 3rem;
  }
`;

const Row = styled(Box)`
  background-color: ${({ theme: { backgroundPrimary } }) => backgroundPrimary};
  flex-direction: row;
  padding: 1.2rem 0;
  /* margin-bottom: 0.5rem; */

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-wrap: wrap;
    height: auto;
    padding: 2rem;
  }
`;

const ColumnTitles = styled(Row)`
  border-radius: 8px 8px 0px 0px;
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.tableHeaderBackground};
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
  border-radius: 0px 0px 4px 4px;
  border: ${({ theme }) => theme.border};
  overflow: hidden;
`;

const SBox = styled(Box)`
  &:nth-child(1) {
    padding-left: 3rem;
  }

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
  }
`;

const TableContainer = styled(Box)`
  margin-top: 5rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 2rem;
  }
`;

const TableTitle = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.4rem;
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
    font-size: 1rem;
  }
`;

const SText = styled(Text)`
  width: 100%;
  text-align: start;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textSecondary};
  font-family: Open Sans;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem; /* 133.333% */
  letter-spacing: -0.24px;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    text-align: start;
    font-size: 1rem;
  }
`;
