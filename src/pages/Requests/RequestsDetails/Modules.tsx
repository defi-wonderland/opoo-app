import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH, fontSize, truncateString, copyData, TABLET_MAX_WIDTH, ZERO_ADDRESS } from '~/utils';
import { Box, ModuleSkeleton, Pill, Text, Title, Icon } from '~/components';
import { DetailsButton } from '~/pages/Requests/RequestsSection';
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
            <>
              {module.address !== ZERO_ADDRESS && (
                <ModuleCard
                  key={'module-' + index}
                  className={module.data ? 'clickable' : ''}
                  onClick={() => module.data && handleClick(module)}
                >
                  {/* Module Address */}
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

                  {/* Module Name */}
                  <MTitle>{module.name}</MTitle>

                  {/* Card Footer */}
                  <SCardFooter>
                    <SDetailsButton>
                      <Icon name='right-arrow' size='0.9rem' />
                    </SDetailsButton>
                  </SCardFooter>
                </ModuleCard>
              )}
            </>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 3rem;
    gap: 2rem;
    justify-content: center;
  }
`;

const ModuleCard = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  max-width: 100%;
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

const SCardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  color: ${({ theme }) => theme.textSecondary};
`;

const SDetailsButton = styled(DetailsButton)``;
