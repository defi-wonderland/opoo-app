// import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';
import { useStateContext } from '~/hooks';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { selectedRequest } = useStateContext();

  // TODO: fix error when refreshing page
  // const { id } = useParams();
  // useEffect(() => {
  //   const selectedRequests = requests.filter((request) => request.id === id);
  //   setSelectedRequest(selectedRequests[0]);
  // }, [id, requests, setSelectedRequest]);

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
