import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Title } from '~/components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  padding: 12rem 8rem 10rem;
`;

export const About = () => {
  return (
    <Container>
      <Title data-testid='about-page-title'>About</Title>
      <Link to='/requests'>Go back to Request</Link>
    </Container>
  );
};
