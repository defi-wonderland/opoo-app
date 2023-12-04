import { Config } from '~/types';

import { getEnv } from './env';
import { getConstants } from './constants';

import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const client = createPublicClient({
  chain: mainnet,
  transport: http(getEnv().ENS_RPC_URL, { batch: true }),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getEnv().RPC_URL, { batch: true }),
});

export const getConfig = (): Config => ({
  ...getEnv(),
  ...getConstants(),
});
