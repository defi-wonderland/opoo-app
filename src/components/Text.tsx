import styled from 'styled-components';
import { MOBILE_MAX_WIDTH } from '~/utils';

export const Text = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${({ theme }) => theme.textFontFamily};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: 1rem;
    line-height: normal;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.titleFontFamily};
  font-size: 5.2rem;
  font-weight: 600;
  line-height: 6.4rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: 2.5rem;
    line-height: normal;
  }
`;
