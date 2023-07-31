import styled from 'styled-components';
import { Box, Text, Title } from '~/components';
import { useStateContext } from '~/hooks';

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 8rem 8rem;
`;

const ModulesContainer = styled(Box)`
  margin-top: 5rem;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
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
