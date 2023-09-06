import { ethers } from 'ethers';
import { ProphetSDK } from 'prophet-sdk';

import { getConfig, client } from '~/config';

export const useProphetSdk = () => {
  const { RPC_URL, ORACLE } = getConfig();
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const prophetSdk = new ProphetSDK(provider, ORACLE);

  return { prophetSdk, client };
};
