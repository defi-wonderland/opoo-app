import styled from 'styled-components';

import { Box, Pill, Text, Title } from '~/components';
import { useModal, useStateContext } from '~/hooks';
import { MOBILE_MAX_WIDTH } from '~/utils';

export const Modules = () => {
  const { modules } = useStateContext();
  const { setOpen } = useModal();

  const handleModal = () => setOpen(true);

  return (
    <SBox>
      <Title>Modules</Title>
      <ModulesContainer>
        {modules.map((module, index) => (
          <ModuleCard key={'module-' + index} onClick={handleModal}>
            {/* temporary text */}
            <Pill iconName='hashtag' text='3d4919c6b9...f368ae1ec2rth' size='1.3rem' copy />
            <MTitle>{module.name}</MTitle>
            <Description>{module.description}</Description>
          </ModuleCard>
        ))}
      </ModulesContainer>
    </SBox>
  );
};

const SBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 8rem 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 3rem 3rem;
  }
`;

const ModulesContainer = styled(Box)`
  margin-top: 5rem;
  gap: 4rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 3rem;
    gap: 1rem;
  }
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  max-width: 40rem;
  height: 16rem;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    border: ${({ theme }) => theme.border};
    height: auto;
  }
`;

const MTitle = styled(Text)`
  font-size: 1.8rem;
  padding: 1rem 0;
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`;
