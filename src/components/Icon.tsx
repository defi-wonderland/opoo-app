import styled from 'styled-components';

import { StatusName } from '~/types';

export type IconName =
  | 'close'
  | 'copy'
  | 'copy-success'
  | 'discord'
  | 'docs'
  | 'github'
  | 'hashtag'
  | 'menu'
  | 'moon'
  | 'right-arrow'
  | 'sun'
  | StatusName;

export const Icon = styled.i.attrs<{ name: IconName }>((props) => ({
  className: `icon-${props.name}`,
}))<{
  name: IconName;
  color?: string;
  size?: string;
  padding?: string;
  rotate?: number;
}>`
  color: ${(props) => props.color || 'inherit'};
  display: inline-block;
  font-size: ${(props) => props.size || '1.8rem'};
  transform: rotate(${(props) => props.rotate || 0}deg);
`;

export const StatusIcon = styled(Icon)<{ color: StatusName }>`
  border-radius: 0 8px 0 8px;
  color: #fff;
  background-color: ${(props) => props.theme[props.color]};
`;
