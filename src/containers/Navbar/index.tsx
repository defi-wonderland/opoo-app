import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Icon } from '~/components';
import { SNavbar, LogoContainer, Logo, LinkText, LinkContainer, Icons, IconLink, MenuButton } from './Navbar.styles';
import { useStateContext } from '~/hooks';
import { THEME_KEY } from '~/utils';

export const Navbar = () => {
  const { setTheme, theme } = useStateContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const animationDuration = 200;

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem(THEME_KEY, 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem(THEME_KEY, 'light');
      setTheme('light');
    }
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <SNavbar>
      {/* Logo */}
      <LogoContainer>
        <Logo to='/requests'>OpOO</Logo>
      </LogoContainer>

      {/* Navbar Links */}
      <CSSTransition in={menuOpen} timeout={animationDuration} classNames='slide'>
        <LinkContainer className={menuOpen ? 'show-links' : 'hidden'}>
          <LinkText onClick={handleCloseMenu} to='/requests'>
            Requests
          </LinkText>
          <LinkText onClick={handleCloseMenu} to='#'>
            About
          </LinkText>
          <LinkText onClick={handleCloseMenu} to='#'>
            FAQ
          </LinkText>
          <LinkText onClick={handleCloseMenu} to='#'>
            Docs
          </LinkText>
        </LinkContainer>
      </CSSTransition>

      {/* Menu Button (Mobile) */}
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        <Icon name='menu' size='2rem' />
      </MenuButton>

      {/* Icons Section */}
      <CSSTransition in={menuOpen} timeout={300} classNames='slide'>
        <Icons className={menuOpen ? 'show-icons' : 'hidden'}>
          <IconLink to='#' onClick={handleThemeChange}>
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size='1.6rem' />
          </IconLink>

          <IconLink to='#'>
            <Icon name='github' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink to='#'>
            <Icon name='discord' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>

          <IconLink to='#'>
            <Icon name='docs' size='1.6rem' color={theme === 'light' ? 'black' : 'white'} />
          </IconLink>
        </Icons>
      </CSSTransition>
    </SNavbar>
  );
};
