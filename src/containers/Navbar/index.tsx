import { Icon } from '~/components';
import { SNavbar, LogoContainer, Logo, LinkText, LinkContainer, Icons, IconLink } from './Navbar.styles';
import { useStateContext } from '~/hooks';

export const Navbar = () => {
  const { setTheme, theme } = useStateContext();

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <SNavbar>
      <LogoContainer>
        <Logo to='/'>OpOO</Logo>
      </LogoContainer>

      <LinkContainer>
        <LinkText to='/requests'>Requests</LinkText>
        <LinkText to='/about'>About</LinkText>
        <LinkText to='/faq'>FAQ</LinkText>
        <LinkText to='/docs'>Docs</LinkText>

        <Icon name='menu' size='1.6rem' />
      </LinkContainer>

      <Icons>
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
    </SNavbar>
  );
};
