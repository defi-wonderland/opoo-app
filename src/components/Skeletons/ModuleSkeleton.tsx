import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { CardSkeleton, SkeletonProps } from './RequestSkeleton';

const SCardSkeleton = styled(CardSkeleton)`
  width: 40rem;
  height: 9.6rem;
`;

export const ModuleSkeleton = ({ count, theme }: SkeletonProps) => {
  // Card loading skeleton
  const Card = (
    <SCardSkeleton>
      <div>
        <Skeleton count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </div>

      <div>
        <Skeleton count={1} width='60%' highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </div>
    </SCardSkeleton>
  );

  // Create an array of cards with the specified count
  const Cards = Array(count).fill(Card, 0, count);

  return (
    <>
      {Cards.map((Card, index) => (
        <div key={'request-skeleton-' + index}>{Card}</div>
      ))}
    </>
  );
};
