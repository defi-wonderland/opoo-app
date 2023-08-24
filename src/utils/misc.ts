import { decodeAbiParameters, Address } from 'viem';

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

// moduleNames are camelCase, this function formats them to be more readable
export const formatModuleName = (moduleName: string) => {
  const name = moduleName.split(/(?=[A-Z])/);
  return name.join(' ');
};
