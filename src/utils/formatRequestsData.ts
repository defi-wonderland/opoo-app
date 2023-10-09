import { RequestFullData } from '@defi-wonderland/prophet-sdk';
import { Address } from 'viem';

import { EnsNames, RequestData } from '~/types';
import {
  Metadata,
  decodeData,
  formatModuleData,
  formatModuleName,
  getDispute,
  getStatus,
  isFinalResponse,
} from '~/utils';

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
    const { returnedTypes, description, responseType } = metadatas[index] || {};
    let requestData: string[] = [],
      responseData: string[] = [],
      disputeData: string[] = [],
      finalityData: string[] = [],
      resolutionData: string[] = [];

    if (returnedTypes) {
      requestData = decodeData(returnedTypes[requestModule], requestModuleData as Address);
      responseData = decodeData(returnedTypes[responseModule], responseModuleData as Address);
      disputeData = decodeData(returnedTypes[disputeModule], disputeModuleData as Address);
      finalityData = decodeData(returnedTypes[finalityModule], finalityModuleData as Address);
      resolutionData = decodeData(returnedTypes[resolutionModule], resolutionModuleData as Address);
    }

    return {
      id: requestId,
      description: description || 'Not supplied',
      createdAt: createdAt.toString(),
      requester: ensNames[requestId].requester || requester,
      nonce: fullRequest.request.nonce.toString(),
      status: getStatus(fullRequest),

      // Responses section
      responses: responses.map((response, index) => ({
        response: responseType
          ? decodeData([{ name: '', type: responseType }], response.response as Address)[0].toString()
          : response.response, // decoded response if responseType is defined
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
          data: formatModuleData(returnedTypes, requestModule, requestModuleData, requestData),
        },
        {
          name: formatModuleName(responseModuleName),
          address: responseModule,
          data: formatModuleData(returnedTypes, responseModule, responseModuleData, responseData),
        },
        {
          name: formatModuleName(disputeModuleName),
          address: disputeModule,
          data: formatModuleData(returnedTypes, disputeModule, disputeModuleData, disputeData),
        },
        {
          name: formatModuleName(resolutionModuleName),
          address: resolutionModule,
          data: formatModuleData(returnedTypes, resolutionModule, resolutionModuleData, resolutionData),
        },
        {
          name: formatModuleName(finalityModuleName),
          address: finalityModule,
          data: formatModuleData(returnedTypes, finalityModule, finalityModuleData, finalityData),
        },
      ],
    };
  });

  return requests.reverse();
};
