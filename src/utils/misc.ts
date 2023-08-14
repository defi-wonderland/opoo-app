import { decodeAbiParameters, Address } from 'viem';
import { RequestFullData } from 'opoo-sdk/dist/batching';

import { client as publicClient } from '~/config';
import { TypeResults } from '~/types';

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

export const decodeData = (types: TypeResults[], data: Address): string[] => {
  const decodedValues = decodeAbiParameters(types, data) as string[];
  return decodedValues;
};

export const getRequestEnsNames = async (
  requests: RequestFullData[],
  client: typeof publicClient,
): Promise<{ [requestId: string]: string | null }> => {
  const ensNames = requests.map(async (request) => [
    request.requestId,
    await client.getEnsName({ address: request.request.requester as Address }),
  ]);

  const result = await Promise.all(ensNames);

  return Object.fromEntries(result);
};
