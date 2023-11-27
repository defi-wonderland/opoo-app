import { RequestFullData } from '@defi-wonderland/prophet-sdk';

import { getTimestamp } from './misc';
import { publicClient } from '~/config';

export interface TimeStamps {
  request: string;
  responses: string[];
  finalizedResponse: string;
}

export const getTimeStamps = (requests: RequestFullData[]): Promise<TimeStamps[]> => {
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

  const result = Promise.all(resultPromise);

  return result;
};
