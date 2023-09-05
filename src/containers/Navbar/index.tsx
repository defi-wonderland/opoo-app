import { useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Icon } from '~/components';
import { SNavbar, LogoContainer, Logo, LinkContainer, Icons, IconLink, MenuButton, ThemeButton } from './Navbar.styles';
import { useStateContext } from '~/hooks';
import { THEME_KEY } from '~/utils';
import { getConfig } from '~/config';

export const Navbar = () => {
  const { setTheme, theme } = useStateContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const animationDuration = 200;

  const docsLink = useMemo(() => {
    const { DEV_MODE, docsLink } = getConfig();

    if (DEV_MODE) {
      return `https://dev.${docsLink}`;
    } else {
      return `https://${docsLink}`;
    }
  }, []);

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem(THEME_KEY, 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem(THEME_KEY, 'light');
      setTheme('light');
    }
  };

  return (
    <SNavbar>
      {/* Logo */}
      <LogoContainer>
        <Logo to='/'>Prophet Explorer</Logo>
      </LogoContainer>

      {/* Navbar Links */}
      <CSSTransition in={menuOpen} timeout={animationDuration} classNames='slide'>
        <LinkContainer className={menuOpen ? 'show-links' : 'hidden'}>{/* Add navbar links here... */}</LinkContainer>
      </CSSTransition>

      {/* Menu Button (Mobile) */}
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        <Icon name='menu' size='2rem' />
      </MenuButton>

      {/* Icons Section */}
      <CSSTransition in={menuOpen} timeout={300} classNames='slide'>
        <Icons className={menuOpen ? 'show-icons' : 'hidden'}>
          <ThemeButton onClick={handleThemeChange}>
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size='1.6rem' />
          </ThemeButton>

          <IconLink href='#'>
            <Icon name='github' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink href='#'>
            <Icon name='discord' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink href={docsLink}>
            <Icon name='docs' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>
        </Icons>
      </CSSTransition>
    </SNavbar>
  );
};
