import { ethers } from 'ethers';
import { OpooSDK } from 'opoo-sdk';

import { getConfig, client } from '~/config';

export const useOpooSdk = () => {
  const { RPC_URL, ORACLE } = getConfig();
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const opooSdk = new OpooSDK(provider, ORACLE);

  return { opooSdk, client };
};
