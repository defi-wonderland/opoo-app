import styled from 'styled-components';

import { IconLink, Icons, LinkContainer, LinkText, Logo, LogoContainer } from '../Navbar/Navbar.styles';
import { useStateContext } from '~/hooks';
import { Icon, Text } from '~/components';

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.headerBackground};
  padding: 4.4rem 8rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: ${({ theme }) => theme.border};
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SLinkContainer = styled(LinkContainer)`
  gap: 15rem;
  padding: 0 3rem;
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

        <Icons>
          <IconLink to='#'>
            <Icon name='github' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink to='#'>
            <Icon name='discord' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>
        </Icons>
      </TopSection>
      <Text>© 2023 OpOO</Text>
    </FooterContainer>
  );
};
