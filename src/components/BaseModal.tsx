import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Icon, Box, Text, ExternalLink } from '~/components';
import { MOBILE_MAX_WIDTH, copyData, fontSize } from '~/utils';
import { SIcon } from '~/pages/Requests/RequestsDetails/Details';
import { useStateContext } from '~/hooks';
import { Items } from '~/types';

interface BaseModalProps {
  setOpen: (val: boolean) => void;
}
export const BaseModal = ({ setOpen }: BaseModalProps) => {
  const { selectedModule } = useStateContext();
  const [items, setItems] = useState<Items[]>([{ value: 'id', itemCopied: false }]);

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
    if (selectedModule.data) {
      const newItems = selectedModule.data.map((data) => ({
        value: data.name,
        itemCopied: false,
      }));
      setItems([...newItems, ...items]);
    }
  }, [selectedModule]);

  return (
    <SModal>
      <MHeader>
        <div>
          <h1>{selectedModule.name}</h1>
          <SExternalLink>
            <SText>{selectedModule.address}</SText>
          </SExternalLink>
        </div>
        <CloseIcon onClick={() => setOpen(false)}>
          <Icon name='close' size='1.2rem' />
        </CloseIcon>
      </MHeader>

      <MBody className='custom-scrollbar'>
        {selectedModule.data?.[0]?.name === 'Raw data' && (
          <ErrorContent>
            <ErrorIcon name='disputed' />
            <ErrorText>Unexpected error: failed to decode module&apos;s data.</ErrorText>
          </ErrorContent>
        )}

        <Content className='custom-scrollbar'>
          {selectedModule.data?.map(({ name, value }, index) => (
            <SDataContainer key={'request-data-' + index} className='ellipsis'>
              <SText>{name}</SText>
              <SBox onClick={() => handleCopy(value, index)}>
                <SText>
                  {value}

                  {!items[index]?.itemCopied && <Icon name='copy' size='1.2rem' />}
                  {items[index]?.itemCopied && <SIcon name='copy-success' size='1.2rem' />}
                </SText>
              </SBox>
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

  div {
    overflow: hidden;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    color: ${({ theme }) => theme.textPrimary};
    text-align: start;
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

const SExternalLink = styled(ExternalLink)`
  p {
    color: ${({ theme }) => theme.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    overflow-y: auto;
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
  max-height: 35rem;
  overflow-y: auto;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    gap: 1rem;
    padding: 2rem 2rem;
    background-color: ${({ theme }) => theme.backgroundPrimary};
  }
`;

const ErrorContent = styled(Content)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0;
  gap: 3rem;
  align-items: start;

  & > p {
    word-break: unset;
    max-width: 20rem;
    color: ${({ theme }) => theme.textSecondary};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    gap: 1rem;
    p:nth-child(1) {
      width: 100%;
    }

    p {
      font-size: ${fontSize.SMALL};
    }

    & > p {
      max-width: 15rem;
    }
  }
`;

const SBox = styled(Box)`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 0.6rem;
  cursor: pointer;

  i {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    padding-left: 0.6rem;
  }

  &:hover i {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  p {
    display: inline-block;
    width: fit-content;
    gap: 0.6rem;
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

const ErrorText = styled(SText)`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 400;
`;

const ErrorIcon = styled(Icon)``;
