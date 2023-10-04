import { ProphetSDK } from '@defi-wonderland/prophet-sdk';
import { fulfillWithTimeLimit } from '~/utils';

export const getRawRequests = async (prophetSdk: ProphetSDK, startCount: number, requestsAmount: number) => {
  const timeout = 10000; // 10 seconds
  const task = prophetSdk.batching.listRequests(startCount, requestsAmount);

  const data = await fulfillWithTimeLimit(timeout, task, []);
  return data;
};
