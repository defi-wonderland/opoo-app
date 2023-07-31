import styled from 'styled-components';
import { Box, Text, Title } from '~/components';
import { useStateContext } from '~/hooks';
import { MOBILE_MAX_WIDTH } from '~/utils';

const SBox = styled(Box)`
  background-color: ${({ theme: { type, backgroundPrimary, backgroundSecondary } }) =>
    type !== 'light' ? backgroundSecondary : backgroundPrimary};
  padding: 8rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 3rem 3rem;
  }
`;

const ModulesContainer = styled(Box)`
  margin-top: 5rem;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 3rem;
  }
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme: { type, backgroundPrimary, backgroundSecondary } }) =>
    type === 'light' ? backgroundSecondary : backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  max-width: 41.3rem;
  height: 11rem;
  justify-content: space-between;
`;

const MTitle = styled(Text)`
  font-size: 1.8rem;
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
`;

const Address = styled(Text)`
  font-size: 1.2rem;
`;

export const Modules = () => {
  const { modules } = useStateContext();

  return (
    <SBox>
      <Title>Modules</Title>
      <ModulesContainer>
        {modules.map((module, index) => (
          <ModuleCard key={'module-' + index}>
            <MTitle>{module.name}</MTitle>
            <Description>{module.description}</Description>
            <Address>{module.address}</Address>
          </ModuleCard>
        ))}
      </ModulesContainer>
    </SBox>
  );
};
