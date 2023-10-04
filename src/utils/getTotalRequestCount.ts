import { ProphetSDK } from '@defi-wonderland/prophet-sdk';
import { fulfillWithTimeLimit } from '~/utils';

export const getTotalRequestCount = async (prophetSdk: ProphetSDK) => {
  const timeout = 10000; // 10 seconds
  const task = prophetSdk.helpers.totalRequestCount();
  const data = await fulfillWithTimeLimit(timeout, task, 0);
  return data;
};
