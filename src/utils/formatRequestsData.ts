import { AbiCoder, toUtf8String } from 'ethers';
import { RequestFullData } from 'opoo-sdk/dist/batching';
import { ParamType } from 'ethers';

import { RequestData } from '~/types';
import { getStatus } from './getStatus';
import { getDate } from './getDate';

export const decodeData = (types: (string | ParamType)[], data: string) => {
  return AbiCoder.defaultAbiCoder().decode(types, data);
};

export interface ReturnedTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any[];
}

export const formatRequestsData = (
  requestsFullData: RequestFullData[],
  returnedTypes: ReturnedTypes,
): RequestData[] => {
  const lastRequest = requestsFullData[requestsFullData.length - 1];
  const requestReturnedTypes = returnedTypes[lastRequest.request.requestModule];

  const requests: RequestData[] = requestsFullData.map((fullRequest) => {
    const requestModuleData = decodeData(requestReturnedTypes, fullRequest.request.requestModuleData);

    return {
      id: fullRequest.requestId,
      description: requestModuleData[2],
      createdAt: getDate(fullRequest.request.createdAt),
      requester: fullRequest.request.requester,
      nonce: fullRequest.request.nonce.toString(),
      status: getStatus(fullRequest),

      // Responses section
      responses: fullRequest.responses.map((response) => ({
        response: toUtf8String(response.response), // decoded response
        proposer: response.proposer,
        requestId: response.requestId,
        dispute: getDate(response.createdAt), // WIP
      })),

      // Modules section (WIP)
      modules: [
        {
          name: 'Http Request Module',
          address: fullRequest.request.requestModule,
          data: requestModuleData,
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
