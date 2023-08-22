import styled from 'styled-components';
import { SLink, SPill, Text, Title, Icon } from '~/components';
import { darkTheme } from '~/components/Theme';
import { Icons, IconLink } from '~/containers/Navbar/Navbar.styles';
import { MOBILE_MAX_WIDTH } from '~/utils';

export const Landing = () => {
  return (
    <LandingContainer>
      <Content>
        <Title data-testid='landing-page-title'>Optimistic Oracles</Title>
        <Text>
          A versatile and fully adaptable optimistic oracle solution that transcends the boundaries of conventional
          dispute resolution modules
        </Text>
        <LinksContainer>
          <SLink to='/requests' data-testid='requests-page-btn'>
            <SPill>Explorer</SPill>
          </SLink>
          <SLink to='/requests'>
            <SPill>SDK</SPill>
          </SLink>
          <SLink to='/requests'>
            <SPill>Documentation</SPill>
          </SLink>
        </LinksContainer>
        <SIcons>
          <SIconLink to='#'>
            <Icon name='github' size='2rem' color={'white'} />
          </SIconLink>
          <SIconLink to='#'>
            <Icon name='discord' size='2rem' color={'white'} />
          </SIconLink>
        </SIcons>
      </Content>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${darkTheme.backgroundPrimary};
  color: ${darkTheme.textPrimary};

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 8rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 3rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 3rem;

  max-width: 70rem;
  width: 100%;

  h1 {
    font-size: 7rem;
  }

  p {
    font-size: 2rem;
    line-height: 1.6;
    color: ${darkTheme.textPrimary};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    h1 {
      font-size: 4rem;
    }

    p {
      font-size: 1.4rem;
      line-height: 1.6;
      color: ${darkTheme.textPrimary};
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;

  gap: 2rem;

  div {
    padding: 1rem 2rem;
    cursor: pointer;
    background-color: ${darkTheme.backgroundSecondary};
  }

  div:hover {
    background-color: ${darkTheme.backgroundActive};
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: 1.4rem;
    div {
      padding: 0.6rem 1rem;
      cursor: pointer;
      background-color: ${darkTheme.backgroundSecondary};
    }
  }
`;

const SIcons = styled(Icons)`
  justify-content: start;
  a {
    margin-left: 0;
    margin-right: 2rem;
  }
`;

const SIconLink = styled(IconLink)`
  background-color: ${darkTheme.iconBackground};
  border-radius: ${darkTheme.borderRadius};
`;
