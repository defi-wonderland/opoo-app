import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, fontSize, truncateString } from '~/utils';
import { Box, ExternalLink, Pill, Text, Title } from '~/components';
import { useModal, useStateContext } from '~/hooks';

export const Modules = () => {
  const { setOpen } = useModal();
  const {
    selectedRequest: { modules },
  } = useStateContext();

  const handleModal = () => setOpen(true);

  return (
    <SBox>
      <Title>Modules</Title>
      <ModulesContainer>
        {modules?.map((module, index) => (
          <ModuleCard
            key={'module-' + index}
            onClick={() => {
              // TODO: fill the modal with the module data
              console.log(module?.data);
              handleModal();
            }}
          >
            <Pill text={truncateString(module.address, 9)} clickable />
            <TitleContainer>
              <MTitle>{module.name}</MTitle>
              <ExternalLink
                href={`https://optimistic.etherscan.io/address/${module.address}`}
                onClick={(e) => e.stopPropagation()}
              ></ExternalLink>
            </TitleContainer>
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
  justify-content: left;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 3rem;
    gap: 2rem;
  }
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  max-width: 40rem;
  gap: 1rem;
  justify-content: space-between;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transition: opacity 0.2s ease-in-out;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    border: ${({ theme }) => theme.border};
    height: auto;
    padding: 1rem;
  }
`;

const TitleContainer = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const MTitle = styled(Text)`
  font-size: ${fontSize.LARGE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.85rem;
`;
