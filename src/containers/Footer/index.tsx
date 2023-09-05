import { useMemo } from 'react';
import styled from 'styled-components';

import { IconLink, Icons, Logo, LogoContainer } from '../Navbar/Navbar.styles';
import { useStateContext } from '~/hooks';
import { Icon, Text } from '~/components';
import { TABLET_MAX_WIDTH } from '~/utils';
import { getConfig } from '~/config';

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.headerBackground};
  padding: 4.4rem 8rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: ${({ theme }) => theme.border};

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    padding: 3rem 2.4rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SIcons = styled(Icons)`
  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    display: none;
  }
`;

export const Footer = () => {
  const { theme } = useStateContext();

  const docsLink = useMemo(() => {
    const { DEV_MODE, docsLink } = getConfig();

    if (DEV_MODE) {
      return `https://dev.${docsLink}`;
    } else {
      return `https://${docsLink}`;
    }
  }, []);

  return (
    <FooterContainer>
      <TopSection>
        <LogoContainer>
          <Logo to='/'>Prophet</Logo>
        </LogoContainer>

        <SIcons>
          <IconLink href='#'>
            <Icon name='github' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink href='#'>
            <Icon name='discord' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink href={docsLink}>
            <Icon name='docs' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>
        </SIcons>
      </TopSection>
      <Text>© 2023 Prophet</Text>
    </FooterContainer>
  );
};
