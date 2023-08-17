import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { CardSkeleton } from './RequestSkeleton';
import { Theme } from '~/types';

const SCardSkeleton = styled(CardSkeleton)`
  border: none;
  height: 12.4rem;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  background-color: inherit;
`;

const SBox = styled.div`
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.8rem;
  }
`;

interface SkeletonProps {
  theme: Theme;
}
export const DetailsSkeleton = ({ theme }: SkeletonProps) => {
  return (
    <SCardSkeleton>
      <SBox>
        <Skeleton width='60%' count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
        <Skeleton width='30%' count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
        <Skeleton width='50%' count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
        <Skeleton width='20%' count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </SBox>
    </SCardSkeleton>
  );
};
