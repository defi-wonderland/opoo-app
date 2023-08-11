import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, copyData, fontSize, truncateString } from '~/utils';
import { Box, Pill, Text, Title } from '~/components';
import { useModal, useStateContext } from '~/hooks';
import { Items } from '~/types';

export const Modules = () => {
  const { setOpen } = useModal();
  const [items, setItems] = useState<Items[]>([]);
  const {
    selectedRequest: { modules },
  } = useStateContext();

  const handleModal = () => setOpen(true);

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

  useEffect(() => {
    if (modules?.length) setItems(modules.map((module) => ({ value: module.address, itemCopied: false })));
  }, [modules]);

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
            {/* temporary text */}
            <Pill
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(module.address, index);
              }}
              iconName='hashtag'
              text={truncateString(module.address, 9)}
              size='1.3rem'
              copy
              clickable
              copied={items[index]?.itemCopied}
            />
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
  justify-content: left;

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
  font-size: ${fontSize.LARGE};
  padding: 1rem 0;
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${fontSize.MEDIUM};
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`;
