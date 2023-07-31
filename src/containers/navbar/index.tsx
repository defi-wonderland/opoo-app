import { Icon } from '~/components';
import { SNavbar, LogoContainer, Logo, LinkText, MenuButton, LinkContainer, Icons, IconLink } from './Navbar.styles';
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
        <Logo to='/'>Optimism</Logo>
        <Icon name='OP' size='4rem' />
      </LogoContainer>

      <LinkContainer>
        <LinkText to='/requests'>Requests</LinkText>
        <LinkText to='/about'>About</LinkText>
        <LinkText to='/faq'>FAQ</LinkText>
        <LinkText to='/docs'>Docs</LinkText>

        <MenuButton>Menu</MenuButton>
      </LinkContainer>

      <Icons>
        <IconLink to='https://twitter.com'>
          <Icon name='twitter' size='1.5rem' />
        </IconLink>

        <IconLink to='https://discord.com/'>
          <Icon name='discord' size='1.5rem' />
        </IconLink>

        <IconLink to='#' onClick={handleThemeChange}>
          {/* Temporary icon to change theme color */}
          <Icon name='status' size='1.5rem' />
        </IconLink>
      </Icons>
    </SNavbar>
  );
};
