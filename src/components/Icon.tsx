import styled from 'styled-components';

export type IconName =
  | 'check'
  | 'close'
  | 'created-date'
  | 'discord'
  | 'OP'
  | 'plus'
  | 'requester'
  | 'status'
  | 'status-green'
  | 'status-red'
  | 'status-yellow'
  | 'tag'
  | 'twitter'
  | 'twitch';

export const Icon = styled.i.attrs<{ name: IconName }>((props) => ({
  className: `icon-${props.name}`,
}))<{
  name: IconName;
  color?: string;
  size?: string;
  padding?: string;
  rotate?: number;
}>`
  display: inline-block;
  font-size: ${(props) => props.size || '1.8rem'};
  transform: rotate(${(props) => props.rotate || 0}deg);
`;
