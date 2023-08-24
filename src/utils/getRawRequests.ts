import { OpooSDK } from 'opoo-sdk';
import { fulfillWithTimeLimit } from '~/utils';

export const getRawRequests = async (opooSdk: OpooSDK, startCount: number, requestsAmount: number) => {
  const timeout = 10000; // 10 seconds
  const task = opooSdk.batching.getFullRequestData(startCount, requestsAmount);

  const data = await fulfillWithTimeLimit(timeout, task, []);
  return data;
};
