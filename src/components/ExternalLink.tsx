import styled from 'styled-components';

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: inherit;
  text-decoration: none;
  font-weight: inherit;
  font-size: inherit;
`;
