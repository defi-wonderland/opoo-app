import { OpooSDK } from 'opoo-sdk';
import { fulfillWithTimeLimit } from '~/utils';

export const getTotalRequestCount = async (opooSdk: OpooSDK) => {
  const timeout = 10000; // 10 seconds
  const task = opooSdk.helpers.totalRequestCount();
  const data = await fulfillWithTimeLimit(timeout, task, 0);
  return data;
};
