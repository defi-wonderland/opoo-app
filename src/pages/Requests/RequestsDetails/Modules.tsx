import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, fontSize, truncateString, copyData, TABLET_MAX_WIDTH } from '~/utils';
import { Box, ModuleSkeleton, Pill, Text, Title } from '~/components';
import { Items, Modules as ModuleType, Theme } from '~/types';
import { useModal, useStateContext } from '~/hooks';

interface Props {
  loading: boolean;
  theme: Theme;
}
export const Modules = ({ loading, theme }: Props) => {
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
        {!loading &&
          modules?.map((module, index) => (
            <ModuleCard
              key={'module-' + index}
              className={module.data ? 'clickable' : ''}
              onClick={() => module.data && handleClick(module)}
            >
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

        {loading && <ModuleSkeleton count={5} theme={theme} />}
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

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    justify-content: center;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 3rem;
    gap: 2rem;
    justify-content: center;
  }
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  max-width: 40rem;
  gap: 1rem;
  justify-content: space-between;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundActiveSecondary};
    transition: all 0.2s ease-in-out;
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
