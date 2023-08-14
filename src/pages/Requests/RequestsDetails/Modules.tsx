import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, fontSize, truncateString, copyData } from '~/utils';
import { Box, Pill, Text, Title } from '~/components';
import { useModal, useStateContext } from '~/hooks';
import { Items, Modules as ModuleType } from '~/types';

export const Modules = () => {
  const { setOpen } = useModal();
  const [items, setItems] = useState<Items[]>([]);
  const {
    selectedRequest: { modules },
    setSelectedModule,
  } = useStateContext();

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

  const handleClick = (module: ModuleType) => {
    setSelectedModule(module);
    setOpen(true);
  };

  useEffect(() => {
    if (modules?.length) setItems(modules.map((module) => ({ value: module.address, itemCopied: false })));
  }, [modules]);

  return (
    <SBox>
      <Title>Modules</Title>
      <ModulesContainer>
        {modules?.map((module, index) => (
          <ModuleCard key={'module-' + index} onClick={() => handleClick(module)}>
            <Pill
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(module.address, index);
              }}
              text={truncateString(module.address, 9)}
              size='1.3rem'
              copy
              clickable
              copied={items[index]?.itemCopied}
            />
            <MTitle>{module.name}</MTitle>
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

const MTitle = styled(Text)`
  font-size: ${fontSize.LARGE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.85rem;
`;
