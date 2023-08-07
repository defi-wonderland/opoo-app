import styled from 'styled-components';
import { Icon, IconName } from './Icon';

export const SPill = styled.div`
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme: { pillBackground } }) => pillBackground};
  border-radius: 10rem;
  width: fit-content;
  padding: 0.45rem 0.85rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const TextPill = styled.p<{ fontSize?: string }>`
  display: inline-block;
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Open Sans';
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-style: normal;
  font-weight: 400;
  line-height: 1.4rem; /* 140% */
`;

interface PillProps {
  iconName: IconName;
  text?: string;
  copy?: boolean;
  size?: string;
  iconColor?: string;
  fontSize?: string;
}
export const Pill = ({ iconName, text, copy, size, iconColor, fontSize }: PillProps) => {
  return (
    <SPill>
      <Icon name={iconName} size={size} color={iconColor} />
      <TextPill fontSize={fontSize}>{text}</TextPill>
      {copy && <Icon name='copy' size='1.2rem' />}
    </SPill>
  );
};
