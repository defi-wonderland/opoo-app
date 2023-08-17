import { useState } from 'react';
import styled from 'styled-components';

import { Icon, Pill, Box, Text } from '~/components';
import { MOBILE_MAX_WIDTH, copyData, fontSize, truncateString } from '~/utils';
import { useStateContext } from '~/hooks';

interface BaseModalProps {
  setOpen: (val: boolean) => void;
}
export const BaseModal = ({ setOpen }: BaseModalProps) => {
  const { selectedModule } = useStateContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = (data: string) => {
    copyData(data);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 600);
  };

  return (
    <SModal>
      <MHeader>
        <div>
          <h1>{selectedModule.name}</h1>
          <Pill
            iconName='hashtag'
            text={truncateString(selectedModule.address, 6)}
            onClick={() => handleCopy(selectedModule.address)}
            copy
            clickable
            copied={copied}
          />
        </div>
        <CloseIcon onClick={() => setOpen(false)}>
          <Icon name='close' size='1.2rem' />
        </CloseIcon>
      </MHeader>

      <MBody className='custom-scrollbar'>
        <Content>
          {selectedModule.data?.map(({ name, value }, index) => (
            <SDataContainer key={'request-data-' + index}>
              <SText>{name}</SText>
              <SText>{value}</SText>
            </SDataContainer>
          ))}
        </Content>
      </MBody>
    </SModal>
  );
};

export const SModal = styled(Box)`
  border-radius: 1.2rem;
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  width: 100%;
  max-width: 88.8rem;
  height: fit-content;
  pointer-events: all;
  overflow: hidden;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    width: 100%;
    position: absolute;
    border-radius: 3.6rem 3.6rem 0 0;
    bottom: 0;
    left: 0;
  }
`;

const MHeader = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 2.4rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    color: ${({ theme }) => theme.textPrimary};
    text-align: center;
    font-family: Rubik;
    font-size: ${fontSize.SECTION_TITLE};
    font-style: normal;
    font-weight: 600;
    line-height: 3rem; /* 125% */
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 2.4rem 2.8rem;
    align-items: start;
    justify-content: space-between;
    width: 100%;

    h1 {
      text-align: start;
      color: ${({ theme }) => theme.red};
      font-size: ${fontSize.LARGE};
    }
  }
`;

const MBody = styled.div`
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 2.4rem 3rem;
  border-radius: 1.2rem;
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: ${({ theme }) => theme.backgroundPrimary};
    padding: 0;
    overflow-y: scroll;
    max-height: 70vh;
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  width: 100%;
  height: 100%;
  padding: 2.4rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  border-radius: 1.2rem;
  max-width: 100%;
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    gap: 1rem;
    padding: 2rem 2rem;
    background-color: ${({ theme }) => theme.backgroundPrimary};
  }
`;

const SDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0;
  gap: 3rem;
  align-items: start;

  p:first-child {
    word-break: unset;
    width: 24rem;
    color: ${({ theme }) => theme.textSecondary};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    p:nth-child(1) {
      width: 14rem;
      min-width: 14rem;
    }
    p:nth-child(2) {
      word-break: break-all;
    }

    p {
      font-size: ${fontSize.SMALL};
      overflow-wrap: break-word;
    }
  }
`;

const CloseIcon = styled.div`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.close};
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  width: 3.5rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    width: 3rem;
    height: 3rem;
    i {
      font-size: 1rem;
    }
  }
`;

const SText = styled(Text).attrs({ className: 'ellipsis' })`
  width: 100%;
`;
