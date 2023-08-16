import { RequestFullData } from 'opoo-sdk';
import { hexToString, Address } from 'viem';

import { EnsNames, RequestData } from '~/types';
import { Metadata, decodeData, getDispute, getStatus } from '~/utils';

export const formatRequestsData = (
  requestsFullData: RequestFullData[],
  ensNames: EnsNames,
  metadatas: Metadata[],
): RequestData[] => {
  const requests: RequestData[] = requestsFullData.map((fullRequest, index) => {
    const {
      request: {
        requestModuleData,
        responseModuleData,
        disputeModuleData,
        finalityModuleData,
        resolutionModuleData,
        requestModule,
        responseModule,
        disputeModule,
        finalityModule,
        resolutionModule,
        createdAt,
        requester,
      },
      requestId,
      finalizedResponse,
      responses,
    } = fullRequest;
    const { returnedTypes, description } = metadatas[index];

    const requestData = decodeData(returnedTypes[requestModule], requestModuleData as Address);
    const responseData = decodeData(returnedTypes[responseModule], responseModuleData as Address);
    const disputeData = decodeData(returnedTypes[disputeModule], disputeModuleData as Address);
    const finalityData = decodeData(returnedTypes[finalityModule], finalityModuleData as Address);
    const resolutionData = decodeData(returnedTypes[resolutionModule], resolutionModuleData as Address);

    return {
      id: requestId,
      description: description,
      createdAt: createdAt.toString(),
      requester: ensNames[requestId].requester || requester,
      nonce: fullRequest.request.nonce.toString(),
      status: getStatus(fullRequest),

      // Responses section
      responses: responses.map((response, index) => ({
        response: hexToString(response.response as Address), // decoded response
        proposer: ensNames[requestId].responses[index].proposer || response.proposer,
        requestId: response.requestId,
        dispute: getDispute(response.disputeId, response.createdAt),
      })),

      // Finalized response
      finalizedResponse: {
        // Note: this is required to clean up the fetched the data format
        createdAt: Number(finalizedResponse.createdAt),
        proposer: finalizedResponse.proposer,
        disputeId: finalizedResponse.disputeId,
        response: finalizedResponse.response,
        requestId: finalizedResponse.requestId,
      },

      // Modules section
      modules: [
        {
          name: 'Request Module',
          address: requestModule,
          data: returnedTypes[requestModule]?.map((type, index) => ({
            name: type.name,
            value: requestData[index]?.toString(),
          })),
        },
        {
          name: 'Response Module',
          address: responseModule,
          data: returnedTypes[responseModule]?.map((type, index) => ({
            name: type.name,
            value: responseData[index]?.toString(),
          })),
        },
        {
          name: 'Dispute Module',
          address: disputeModule,
          data: returnedTypes[disputeModule]?.map((type, index) => ({
            name: type.name,
            value: disputeData[index]?.toString(),
          })),
        },
        {
          name: 'Resolution Module',
          address: resolutionModule,
          data: returnedTypes[resolutionModule]?.map((type, index) => ({
            name: type.name,
            value: resolutionData[index]?.toString(),
          })),
        },
        {
          name: 'Finality Module',
          address: finalityModule,
          data: returnedTypes[finalityModule]?.map((type, index) => ({
            name: type.name,
            value: finalityData[index]?.toString(),
          })),
        },
      ],
    };
  });

  console.log(requests);
  return requests.reverse();
};
