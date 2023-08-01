import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH } from '~/utils';

// ------------------------------- Navbar Container ------------------------------- //
export const SNavbar = styled.div`
  position: relative;
  display: flex;
  height: 8rem;
  padding: 0 8rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: ${({ theme }) => theme.headerBackground};
  border-bottom: ${({ theme }) => theme.border};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 0 3rem;
    height: 7.2rem;
  }
`;

// ------------------------------- Logo Section ------------------------------- //

export const LogoContainer = styled.div``;

export const Logo = styled(Link)`
  font-family: 'Rubik', sans-serif;
  font-style: italic;
  font-weight: 600;
  color: #ff0420;
  text-decoration: none;
  font-size: 2rem;
  width: 15rem;
`;

// ------------------------------- Links Section ------------------------------- //
export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.5rem;

  i {
    display: none;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    a {
      display: none;
    }

    i {
      display: block;
    }
  }
`;

export const LinkText = styled(Link)`
  text-decoration: none;
  color: #68778d;
  text-align: center;
  font-family: Open Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const MenuButton = styled.button`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  color: #ff0420;
  text-transform: uppercase;
  font-size: 1.4rem;
  background-color: unset;
  border: unset;
  height: auto;
  text-decoration: solid underline #ff0420 0.2rem;
  text-underline-offset: 0.25rem;
`;

// ------------------------------- Icons Section ------------------------------- //

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  width: 35.4rem;
  justify-content: end;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: none;
  }
`;

export const IconLink = styled(LinkText)`
  color: unset;
  background-color: ${({ theme: { iconBackground } }) => iconBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 4.8rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
`;
