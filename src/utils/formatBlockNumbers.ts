import { RequestFullData } from '@defi-wonderland/prophet-sdk';

import { getTimestamp } from './misc';
import { publicClient } from '~/config';

export interface Timestamps {
  [requestId: string]: {
    request: string;
    responses: string[];
    finalizedResponse: string;
  };
}

export const getTimestamps = async (requests: RequestFullData[]): Promise<Timestamps> => {
  const resultPromise = requests.map(async (fullRequest) => {
    const {
      requestWithId: { blockNumber },
      finalizedResponse,
      responses,
    } = fullRequest;

    const requestTimestampPromise = getTimestamp(publicClient, blockNumber.toString());
    const responsesTimestampPromises = responses.map((response) =>
      getTimestamp(publicClient, response.blockNumber.toString()),
    );
    const finalizedResponseTimestampPromise = finalizedResponse
      ? getTimestamp(publicClient, finalizedResponse.blockNumber.toString())
      : '';

    const [requestTimestamp, responsesTimestamp, finalizedResponseTimestamp] = await Promise.all([
      requestTimestampPromise,
      Promise.all(responsesTimestampPromises),
      finalizedResponseTimestampPromise,
    ]);

    return {
      request: requestTimestamp,
      responses: responsesTimestamp,
      finalizedResponse: finalizedResponseTimestamp,
    };
  });

  const result = await Promise.all(resultPromise);

  const timestampsDictionary = Object.fromEntries(
    requests.map((request, index) => [
      request.requestWithId.requestId.toString(),
      {
        request: result[index].request,
        responses: result[index].responses,
        finalizedResponse: result[index].finalizedResponse,
      },
    ]),
  );

  return timestampsDictionary;
};
