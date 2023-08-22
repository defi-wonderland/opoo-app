import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';
import { useOpooSdk, useStateContext } from '~/hooks';
import { formatRequestsData, getRequestEnsNames, getTheme, getMetadatas } from '~/utils';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { id } = useParams();
  const { opooSdk, client } = useOpooSdk();
  const { selectedRequest, setSelectedRequest, loading, setLoading, theme } = useStateContext();
  const currentTheme = getTheme(theme);

  const loadSelectedRequest = async () => {
    setLoading(true);
    try {
      const rawRequests = await opooSdk.batching.getFullRequestData(Number(id), 1);
      console.log('rawRequests', rawRequests);

      const metadatasPromise = getMetadatas(rawRequests, opooSdk);
      const ensNamePromise = getRequestEnsNames(rawRequests, client);

      const [metadatas, ensName] = await Promise.all([metadatasPromise, ensNamePromise]);
      console.log('metadatas', metadatas);

      const formattedRequests = formatRequestsData(rawRequests, ensName, metadatas);
      setLoading(false);
      setSelectedRequest(formattedRequests[0]);
    } catch (error) {
      setLoading(false);
      console.error(`Error loading request #${id}:`, error);
    }
  };

  useEffect(() => {
    if (!selectedRequest.id) {
      loadSelectedRequest();
    }
  }, []);

  return (
    <Container>
      {/* Request details section */}
      <Details selectedRequest={selectedRequest} loading={loading} theme={currentTheme} />

      {/* Proposed responses section */}
      <Responses responses={selectedRequest.responses} loading={loading} />

      {/* Modules section */}
      <Modules loading={loading} theme={currentTheme} />
    </Container>
  );
};
