import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';
import { useStateContext } from '~/hooks';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { id } = useParams();

  const { requests, setSelectedRequest } = useStateContext();

  useEffect(() => {
    const selectedRequests = requests.filter((request) => request.id === id);
    setSelectedRequest(selectedRequests[0]);
  }, [id, requests, setSelectedRequest]);

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
