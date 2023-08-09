import { AbiCoder, toUtf8String } from 'ethers';
import { OpooSDK } from 'opoo-sdk';
import { RequestFullData } from 'opoo-sdk/dist/batching';

import { RequestData } from '~/types';
import { truncateString } from './truncateString';
import { getStatus } from './getStatus';
import { getDate } from './getDate';

export const formatRequestsData = async (
  requestsFullData: RequestFullData[],
  opooSdk: OpooSDK,
): Promise<RequestData[]> => {
  // temporary: this will be removed when the SDK is updated
  const requestsData = requestsFullData.map(async (fullRequest) => {
    const returnTypes = await opooSdk.modules.getNamedDecodeRequestReturnTypes(fullRequest.request.requestModule);
    const decoded = AbiCoder.defaultAbiCoder().decode(returnTypes[0].components, fullRequest.request.requestModuleData);
    return decoded[2];
  });
  const requestsDataResults = await Promise.all(requestsData);

  const requests: RequestData[] = requestsFullData.map((fullRequest, index) => ({
    id: fullRequest.requestId,
    description: requestsDataResults[index],
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

    // Modules section (TODO)
  }));

  return requests.reverse();
};
