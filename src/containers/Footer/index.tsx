import styled from 'styled-components';

import { IconLink, Icons, LinkText, Logo, LogoContainer } from '../Navbar/Navbar.styles';
import { useStateContext } from '~/hooks';
import { Icon, Text } from '~/components';
import { MOBILE_MAX_WIDTH } from '~/utils';

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.headerBackground};
  padding: 4.4rem 8rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: ${({ theme }) => theme.border};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 3rem 2.4rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SLinkContainer = styled.div`
  display: flex;
  gap: 15rem;
  padding: 0 3rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: row;
    gap: 6rem;
    padding: 2rem 0;
  }
`;

const SIcons = styled(Icons)`
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: none;
  }
`;

export const Footer = () => {
  const { theme } = useStateContext();
  return (
    <FooterContainer>
      <TopSection>
        <LogoContainer>
          <Logo to='#'>OpOO</Logo>
        </LogoContainer>

        <SLinkContainer>
          <LinkText to='#'>Requests</LinkText>
          <LinkText to='#'>About</LinkText>
          <LinkText to='#'>FAQ</LinkText>
        </SLinkContainer>

        <SIcons>
          <IconLink to='#'>
            <Icon name='github' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink to='#'>
            <Icon name='discord' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>
        </SIcons>
      </TopSection>
      <Text>© 2023 OpOO</Text>
    </FooterContainer>
  );
};
