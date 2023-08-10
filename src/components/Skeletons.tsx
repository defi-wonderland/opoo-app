import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { Card } from '~/pages/Requests/RequestsSection';
import { Theme } from '~/types';

const CardSkeleton = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface RequestSkeletonProps {
  count: number;
  theme: Theme;
}
export const RequestSkeleton = ({ count, theme }: RequestSkeletonProps) => {
  // Request card loading skeleton
  const Card = (
    <CardSkeleton>
      <div>
        <Skeleton count={1} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </div>
      <div>
        <Skeleton count={1} width='70%' highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
        <Skeleton count={1} width='50%' highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </div>
      <div>
        <Skeleton count={1} height={60} highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
        <Skeleton count={1} width='60%' highlightColor={theme.highlightColor} baseColor={theme.baseColor} />
      </div>
    </CardSkeleton>
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
