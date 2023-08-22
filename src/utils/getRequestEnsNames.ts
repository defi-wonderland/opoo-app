import { Address } from 'viem';
import { RequestFullData } from 'opoo-sdk';

import { client as publicClient } from '~/config';
import { EnsNames } from '~/types';
import { fulfillWithTimeLimit } from './getMetadatas';

const getEnsName = async (address: string, client: typeof publicClient) => {
  const task = client.getEnsName({ address: address as Address });
  const data = await fulfillWithTimeLimit(3000, task, '');
  return data;
};

export const getRequestEnsNames = async (
  requests: RequestFullData[],
  client: typeof publicClient,
): Promise<EnsNames> => {
  const ensNamePromises = requests.map(async (request) => {
    const requester = await getEnsName(request.request.requester, client);
    const responsePromises = request.responses.map(async (response) => ({
      proposer: await getEnsName(response.proposer, client),
    }));
    const responses = await Promise.all(responsePromises);

    return [
      request.requestId,
      {
        requester,
        responses,
      },
    ];
  });

  const ensNameResults = await Promise.all(ensNamePromises);
  const ensNames = Object.fromEntries(ensNameResults);

  return ensNames;
};
