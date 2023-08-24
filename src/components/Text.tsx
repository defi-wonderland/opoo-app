import styled from 'styled-components';
import { MOBILE_MAX_WIDTH, fontSize } from '~/utils';

export const Text = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${({ theme }) => theme.textFontFamily};
  font-size: ${fontSize.MEDIUM};
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: ${fontSize.SMALL};
    line-height: normal;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.titleFontFamily};
  font-size: ${fontSize.MAIN_TITLE};
  font-weight: 600;
  line-height: 6.4rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: ${fontSize.SECTION_TITLE};
    line-height: normal;
  }
`;
