import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TABLET_MAX_WIDTH, fontSize } from '~/utils';

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
  width: 100%;
  max-width: 100vw;

  /* Transition animation */
  .slide-enter {
    opacity: 0;
    transform: translate3d(100vw, 0, 0);
    transition: transform 200ms ease;
  }
  .slide-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .slide-exit {
    opacity: 0;
    transform: translate3d(100vh, 0, 0);
    transition: transform 200ms cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-exit-active {
    opacity: 0;
    transform: translate3d(100vh, 0, 0);
    transition: transform 200ms cubic-bezier(1, 0.5, 0.8, 1);
  }

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    padding: 0 2rem;
    height: 7.2rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    .hidden {
      display: none;
    }

    .show-links {
      flex-direction: column;
      position: fixed;
      padding-top: 8rem;
      top: 7.2rem;
      left: 0;
      right: 0;
      z-index: 1;

      background-color: ${({ theme }) => theme.headerBackground};
      height: 100vh;
      min-width: 100%;
    }

    .show-links a {
      color: ${({ theme }) => theme.textPrimary};
      text-align: center;
      font-family: Open Sans;
      font-size: ${fontSize.XL};
      font-style: normal;
      font-weight: 400;
      line-height: 100%; /* 20px */
      text-transform: capitalize;
    }

    .show-links a:last-child {
      display: none;
    }

    .show-icons {
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 2rem;
      z-index: 20;
      justify-content: center;
      background-color: transparent;
      gap: 2rem;
      min-width: 100%;
    }

    .show-icons a {
      margin-left: 0;
    }
  }
`;

// ------------------------------- Logo Section ------------------------------- //

export const LogoContainer = styled.div`
  margin-right: 10rem;
`;

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
export const LinkContainer = styled.div<{ menuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 10rem;

  .link-active {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const LinkText = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  font-family: Open Sans;
  font-size: ${fontSize.LARGE};
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const MenuButton = styled.button`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  border: unset;
  height: auto;
  padding: 1.6rem;
  background-color: transparent;
  cursor: pointer;
  display: none;

  i {
    color: ${({ theme }) => theme.textPrimary};
  }

  @media (max-width: ${TABLET_MAX_WIDTH}px) {
    display: block;
  }
`;

// ------------------------------- Icons Section ------------------------------- //

export const Icons = styled.div<{ menuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: end;
  max-width: 100vw;
  width: 100%;
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
