import styled from 'styled-components';
import { Box, Text, Title } from '~/components';

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
  // temporary fixed values
  const modules = [
    {
      name: 'Http Request Module',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
    {
      name: 'Bonded Response Module',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
    {
      name: 'Bonded Dispute Module',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
    {
      name: 'Arbitrator Module',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
    {
      name: 'Callback Module',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
    {
      name: 'HttpRequestModule',
      description: 'Short description of the module',
      address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
    },
  ];

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
