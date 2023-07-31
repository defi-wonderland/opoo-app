import styled from 'styled-components';

export const Text = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${({ theme }) => theme.textFontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.titleFontFamily};
  font-size: 52px;
  font-style: italic;
  font-weight: 600;
  line-height: 64px;
`;
