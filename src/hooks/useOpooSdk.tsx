import { ethers } from 'ethers';
import { getConfig } from '~/config';
import { OpooSDK } from 'opoo-sdk';

export const useOpooSdk = () => {
  const { RPC_URL, ORACLE } = getConfig();
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const opooSdk = new OpooSDK(provider, ORACLE);
  return { opooSdk };
};
