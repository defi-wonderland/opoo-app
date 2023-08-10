import { AbiCoder, toUtf8String } from 'ethers';
import { RequestFullData } from 'opoo-sdk/dist/batching';
import { ParamType } from 'ethers';

import { RequestData } from '~/types';
import { truncateString } from './truncateString';
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
      responses: fullRequest.responses.map((response) => [
        /* response  */ toUtf8String(response.response), // decoded response
        /* proposer  */ truncateString(response.proposer, 4),
        /* requestId */ truncateString(response.requestId, 9),
        /* createdAt */ getDate(response.createdAt),
      ]),

      // Modules section (WIP)
      modules: [
        {
          name: 'Http Request Module',
          description:
            'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
          address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
          data: requestModuleData,
        },
        {
          name: 'Bonded Response Module',
          description:
            'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
          address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
        },
        {
          name: 'Bonded Dispute Module',
          description:
            'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
          address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
        },
        {
          name: 'Arbitrator Module',
          description:
            'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
          address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
        },
        {
          name: 'Callback Module',
          description:
            'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
          address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
        },
      ],
    };
  });

  return requests.reverse();
};
