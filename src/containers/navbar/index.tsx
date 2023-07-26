import { Link } from 'react-router-dom';

import styled from 'styled-components';

const SNavbar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const Navbar = () => {
  return (
    <SNavbar>
      <Link to='/'>Home</Link>
      <Link to='/requests'>Requests</Link>
      <Link to='/about'>About</Link>
      <Link to='/FAQ'>FAQ</Link>
      <Link to='/docs'>Docs</Link>
    </SNavbar>
  );
};
