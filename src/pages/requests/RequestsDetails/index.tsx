import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { id } = useParams();
  return (
    <Container>
      {/* Request details section */}
      <Details id={id} />

      {/* Proposed responses section */}
      <Responses />

      {/* Modules section */}
      <Modules />
    </Container>
  );
};
