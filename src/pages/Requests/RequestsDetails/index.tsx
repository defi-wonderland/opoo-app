import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Details } from './Details';
import { Responses } from './Responses';
import { Modules } from './Modules';
import { useProphetSdk, useStateContext } from '~/hooks';
import { formatRequestsData, getRequestEnsNames, getTheme, getMetadatas, getRawRequests } from '~/utils';

const Container = styled.div`
  width: 100%;
`;

export const RequestsDetails = () => {
  const { id } = useParams();
  const { prophetSdk, client } = useProphetSdk();
  const { selectedRequest, setSelectedRequest, loading, setLoading, theme } = useStateContext();
  const currentTheme = getTheme(theme);

  const loadSelectedRequest = async () => {
    setLoading(true);
    try {
      const rawRequests = await getRawRequests(prophetSdk, Number(id), 1);

      const metadatasPromise = getMetadatas(rawRequests, prophetSdk);
      const ensNamePromise = getRequestEnsNames(rawRequests, client);

      const [metadatas, ensName] = await Promise.all([metadatasPromise, ensNamePromise]);

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
