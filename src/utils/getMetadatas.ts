import { RequestFullData, ProphetSDK } from '@defi-wonderland/prophet-sdk';
import { ReturnedTypes } from '~/types';

export interface Metadata {
  responseType: string;
  description: string;
  returnedTypes: ReturnedTypes;
}

export const getMetadatas = async (requests: RequestFullData[], prophetSdk: ProphetSDK): Promise<Metadata[]> => {
  const metadatas: Metadata[] = [];

  const failureValue = {
    responseType: '',
    description: '',
    returnedTypes: {} as ReturnedTypes,
  };

  for (const request of requests) {
    const task = prophetSdk.ipfs.getMetadata(request.request.ipfsHash);
    const timeLimit = 3000; // 3 sec time limit

    // if getting the metadata takes longer than 3 seconds, return failureValue
    const data = await fulfillWithTimeLimit(timeLimit, task, failureValue);

    if (data == null) {
      //in case longTask doesn't fulfill within the time limit
      metadatas.push(failureValue);
    } else {
      metadatas.push(data);
    }
  }

  return metadatas;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fulfillWithTimeLimit(timeLimit: number, task: Promise<any>, failureValue: any) {
  let timeout;
  const timeoutPromise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      resolve(failureValue);
    }, timeLimit);
  });
  const response = await Promise.race([task, timeoutPromise]);
  if (timeout) {
    //the code works without this but let's be safe and clean up the timeout
    clearTimeout(timeout);
  }
  return response;
}
