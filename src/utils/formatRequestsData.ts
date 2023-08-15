import { RequestFullData } from 'opoo-sdk';
import { hexToString, Address } from 'viem';

import { EnsNames, RequestData, TypeResults } from '~/types';
import { decodeData, getDispute, getStatus } from '~/utils';

export interface ReturnedTypes {
  [key: string]: TypeResults[];
}

export const formatRequestsData = (
  requestsFullData: RequestFullData[],
  ensNames: EnsNames,
  returnedTypes: ReturnedTypes,
): RequestData[] => {
  const lastRequest = requestsFullData[requestsFullData.length - 1];
  const requestReturnedTypes = returnedTypes[lastRequest.request.requestModule];

  const requests: RequestData[] = requestsFullData.map((fullRequest) => {
    const requestModuleData = decodeData(requestReturnedTypes, fullRequest.request.requestModuleData as Address);

    return {
      id: fullRequest.requestId,
      description: requestModuleData[2],
      createdAt: fullRequest.request.createdAt.toString(),
      requester: ensNames[fullRequest.requestId].requester || fullRequest.request.requester,
      nonce: fullRequest.request.nonce.toString(),
      status: getStatus(fullRequest),

      // Responses section
      responses: fullRequest.responses.map((response, index) => ({
        response: hexToString(response.response as Address), // decoded response
        proposer: ensNames[fullRequest.requestId].responses[index].proposer || response.proposer,
        requestId: response.requestId,
        dispute: getDispute(response.disputeId, response.createdAt),
      })),

      // Finalized response
      finalizedResponse: {
        // Note: this is required to clean up the fetched the data format
        createdAt: Number(fullRequest.finalizedResponse.createdAt),
        proposer: fullRequest.finalizedResponse.proposer,
        disputeId: fullRequest.finalizedResponse.disputeId,
        response: fullRequest.finalizedResponse.response,
        requestId: fullRequest.finalizedResponse.requestId,
      },

      // Modules section
      modules: [
        {
          name: 'Http Request Module',
          address: fullRequest.request.requestModule,
          data: {
            url: requestModuleData[0],
            method: requestModuleData[1],
            body: requestModuleData[2],
            accountingExtension: requestModuleData[3],
            paymentToken: requestModuleData[4],
            paymentAmount: requestModuleData[5].toString(),
          },
        },
        {
          name: 'Response Module',
          address: fullRequest.request.responseModule,
        },
        {
          name: 'Dispute Module',
          address: fullRequest.request.disputeModule,
        },
        {
          name: 'Resolution Module',
          address: fullRequest.request.resolutionModule,
        },
        {
          name: 'Finality Module',
          address: fullRequest.request.finalityModule,
        },
      ],
    };
  });

  return requests.reverse();
};
