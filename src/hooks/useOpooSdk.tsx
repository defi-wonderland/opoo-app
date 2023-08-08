import { ethers } from 'ethers';
import { Module, OpooSDK } from 'opoo-sdk';
import { ModulesMap } from 'opoo-sdk/dist/types/Module';
import IHttpRequestModule from 'opoo-core/abi/IHttpRequestModule.json';
import IResponseModule from 'opoo-core/abi/IResponseModule.json';
import IDisputeModule from 'opoo-core/abi/IDisputeModule.json';

import { getConfig } from '~/config';

export const useOpooSdk = () => {
  const { RPC_URL, ORACLE, REQUEST_MODULE, RESPONSE_MODULE, DISPUTE_MODULE } = getConfig();
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // request module
  const requestIface = new ethers.Interface(IHttpRequestModule.abi);
  const requestModule = new Module(REQUEST_MODULE, requestIface, provider);

  // response module
  const responseIface = new ethers.Interface(IResponseModule.abi);
  const responseModule = new Module(RESPONSE_MODULE, responseIface, provider);

  // dispute module
  const disputeIface = new ethers.Interface(IDisputeModule.abi);
  const disputeModule = new Module(DISPUTE_MODULE, disputeIface, provider);

  const knownModules: ModulesMap = {
    [REQUEST_MODULE]: requestModule,
    [RESPONSE_MODULE]: responseModule,
    [DISPUTE_MODULE]: disputeModule,
  };

  const opooSdk = new OpooSDK(provider, ORACLE, knownModules);

  return { opooSdk };
};
