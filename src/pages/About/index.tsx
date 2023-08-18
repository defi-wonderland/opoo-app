import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundPrimary};
`;

export const About = () => {
  return (
    <Container>
      <h1>About</h1>
      <Link to='/requests'>Go back to Request</Link>
    </Container>
  );
};
