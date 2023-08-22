import styled from 'styled-components';
import { Title } from '~/components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundPrimary};
`;

export const Faq = () => {
  return (
    <Container>
      <Title data-testid='faq-page-title'>FAQ</Title>
    </Container>
  );
};
