import styled from 'styled-components';

import { Icon, Pill, Box, Text } from '~/components';
import { MOBILE_MAX_WIDTH } from '~/utils';

interface BaseModalProps {
  setOpen: (val: boolean) => void;
}
export const BaseModal = ({ setOpen }: BaseModalProps) => {
  return (
    <SModal>
      <MHeader>
        <div>
          <h1>Http Request Module</h1>
          <Pill iconName='hashtag' text='3d4919c6b9...f368ae1ec2rth' copy />
        </div>
        <CloseIcon name='close' size='1.2rem' onClick={() => setOpen(false)} />
      </MHeader>

      <MBody>
        <Content>
          {/* Temporary fixed values */}
          <SDataContainer>
            <SText>URL</SText>
            <SText>https://api.coingecko.com/api/v3/simple/price</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Method</SText>
            <SText>GET</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Body</SText>
            <SText>ids=ethereum&vs_currencies=usdh</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Accounting extension</SText>
            <SText>0xFFeA234bB62E1fBC086CA0cE94f1fa4F27D9d288</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Payment token</SText>
            <SText>0xFFeA234bB62E1fBC086CA0cE94f1fa4F27D9d288</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Payment amount</SText>
            <SText>1000</SText>
          </SDataContainer>

          <SDataContainer>
            <SText>Initialization data</SText>
            <SText>
              0x0000000000000000000000001d1499e622d69689cdf9004d05ec547d650ff2110000000000000000000000007f5c764cbc14f9669b88837ca1490cca17c316070000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000
            </SText>
          </SDataContainer>
        </Content>
      </MBody>
    </SModal>
  );
};

export const SModal = styled(Box)`
  border-radius: 1.2rem;
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  width: 88.8rem;
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

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    color: ${({ theme }) => theme.textPrimary};
    text-align: center;
    font-family: Rubik;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 3rem; /* 125% */
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 2.4rem 1.6rem;
    align-items: start;
    h1 {
      color: ${({ theme }) => theme.red};
    }
  }
`;

const MBody = styled.div`
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 2.4rem 3rem;
  border-radius: 1.2rem;

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
      width: 12rem;
      min-width: 12rem;
    }
    p:nth-child(2) {
      word-break: break-all;
    }

    p {
      font-size: 1.4rem;
      overflow-wrap: break-word;
    }
  }
`;

const CloseIcon = styled(Icon)`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.close};
  padding: 1.2rem;
  cursor: pointer;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 0.8rem;
    margin-top: 0.2rem;
  }
`;

const SText = styled(Text)`
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  word-break: break-all;
  width: 100%;
`;
