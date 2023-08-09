import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { Card } from '~/pages/Requests/RequestsSection';

const CardSkeleton = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface RequestSkeletonProps {
  count: number;
}
export const RequestSkeleton = ({ count }: RequestSkeletonProps) => {
  // Request card skeleton
  const Card = (
    <CardSkeleton>
      <div>
        <Skeleton count={1} />
      </div>
      <div>
        <Skeleton count={1} width='70%' />
        <Skeleton count={1} width='50%' />
      </div>
      <div>
        <Skeleton count={1} height={60} />
        <Skeleton count={1} width='60%' />
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
