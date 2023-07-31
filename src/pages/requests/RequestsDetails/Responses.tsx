import styled from 'styled-components';

import { Title, Box, Text } from '~/components';
import { MOBILE_MAX_WIDTH } from '~/utils';

const ResponsesContainer = styled(Box)`
  padding: 8rem 8rem;
`;

const Row = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  flex-direction: row;
  height: 7rem;
  padding: 2rem 0;
  margin-bottom: 0.5rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-wrap: wrap;
    height: auto;
    padding: 2rem;
  }
`;

const ColumnTitles = styled(Row)`
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: none;
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

    p:nth-child(1) {
      display: block;
    }
  }
`;

const TableContainer = styled(Box)`
  margin-top: 5rem;
`;

const TableTitle = styled(Text)`
  font-size: 2.2rem;
  width: 100%;
  text-align: center;
  font-weight: 600;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    text-align: start;
    width: 20rem;
  }
`;

const SText = styled(Text)`
  width: 100%;
  text-align: center;
  font-size: 1.8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    text-align: start;
  }
`;

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

        <Box>
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
        </Box>
      </TableContainer>
    </ResponsesContainer>
  );
};
