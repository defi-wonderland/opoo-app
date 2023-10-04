import { RequestFullData } from '@defi-wonderland/prophet-sdk';
import { Address } from 'viem';

import { EnsNames, RequestData } from '~/types';
import { Metadata, decodeData, formatModuleName, getDispute, getStatus, isFinalResponse } from '~/utils';

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
      disputeModuleName,
      requestModuleName,
      finalityModuleName,
      responseModuleName,
      resolutionModuleName,
    } = fullRequest;
    const { returnedTypes, description, responseType } = metadatas[index];

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
        response: decodeData([{ name: '', type: responseType }], response.response as Address)[0].toString(), // decoded response
        proposer: ensNames[requestId].responses[index].proposer || response.proposer,
        responseId: response.responseId,
        dispute: getDispute(response.disputeId, response.createdAt, isFinalResponse(response, finalizedResponse)),
        finalized: isFinalResponse(response, finalizedResponse),
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
          name: formatModuleName(requestModuleName),
          address: requestModule,
          data: returnedTypes[requestModule]?.map((type, index) => ({
            name: type.name,
            value: requestData[index]?.toString(),
          })),
        },
        {
          name: formatModuleName(responseModuleName),
          address: responseModule,
          data: returnedTypes[responseModule]?.map((type, index) => ({
            name: type.name,
            value: responseData[index]?.toString(),
          })),
        },
        {
          name: formatModuleName(disputeModuleName),
          address: disputeModule,
          data: returnedTypes[disputeModule]?.map((type, index) => ({
            name: type.name,
            value: disputeData[index]?.toString(),
          })),
        },
        {
          name: formatModuleName(resolutionModuleName),
          address: resolutionModule,
          data: returnedTypes[resolutionModule]?.map((type, index) => ({
            name: type.name,
            value: resolutionData[index]?.toString(),
          })),
        },
        {
          name: formatModuleName(finalityModuleName),
          address: finalityModule,
          data: returnedTypes[finalityModule]?.map((type, index) => ({
            name: type.name,
            value: finalityData[index]?.toString(),
          })),
        },
      ],
    };
  });

  return requests.reverse();
};
