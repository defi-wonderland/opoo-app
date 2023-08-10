import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';
import { useOpooSdk, useStateContext } from '~/hooks';
import { formatRequestsData } from '~/utils';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { id } = useParams();
  const { opooSdk } = useOpooSdk();
  const { selectedRequest, setSelectedRequest } = useStateContext();

  const loadSelectedRequest = async () => {
    const rawRequests = await opooSdk.batching.getFullRequestData(Number(id), 1);
    const returnedTypes = await opooSdk.ipfs.getReturnedTypes(rawRequests[rawRequests.length - 1].request.ipfsHash);

    const formattedRequests = formatRequestsData(rawRequests, returnedTypes);
    setSelectedRequest(formattedRequests[0]);
  };

  useEffect(() => {
    if (!selectedRequest.id) {
      loadSelectedRequest();
    }
  }, []);

  return (
    <Container>
      {/* Request details section */}
      <Details selectedRequest={selectedRequest} />

      {/* Proposed responses section */}
      <Responses responses={selectedRequest.responses} />

      {/* Modules section */}
      <Modules /* modules={selectedRequest.modules} */ />
    </Container>
  );
};
