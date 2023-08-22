import { Address, decodeAbiParameters } from 'viem';
import { RequestFullData } from 'opoo-sdk';

import { client as publicClient } from '~/config';
import { EnsNames, TypeResults } from '~/types';

export const copyData = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const timeAgo = (timestamp: string | number) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(Number(timestamp) * 1000).getTime();

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  if (timeDifference < minute) {
    const seconds = Math.round(timeDifference / 1000);
    return `${seconds} seconds ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.round(timeDifference / minute);
    return `${minutes} minutes ago`;
  } else if (timeDifference < day) {
    const hours = Math.round(timeDifference / hour);
    return `${hours} hours ago`;
  } else {
    const days = Math.round(timeDifference / day);
    return `${days} days ago`;
  }
};

export const decodeData = (types: TypeResults[] | undefined, data: Address): string[] => {
  if (!types) return [];

  try {
    const decodedValues = decodeAbiParameters(types, data) as string[];
    return decodedValues;
  } catch (error) {
    console.error('Error calling "decodeData" function:', error);

    // if we cant decode the data, return the raw data
    return [data];
  }
};

const getEnsName = async (address: string, client: typeof publicClient) => {
  return await client.getEnsName({ address: address as Address });
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
