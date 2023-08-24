import styled from 'styled-components';

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: inherit;
  text-decoration: none;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`;
