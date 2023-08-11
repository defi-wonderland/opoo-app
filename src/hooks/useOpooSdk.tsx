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
  const requestModule = new Module(REQUEST_MODULE, IHttpRequestModule.abi, provider);

  // response module
  const responseModule = new Module(RESPONSE_MODULE, IResponseModule.abi, provider);

  // dispute module
  const disputeModule = new Module(DISPUTE_MODULE, IDisputeModule.abi, provider);

  const knownModules: ModulesMap = {
    [REQUEST_MODULE]: requestModule,
    [RESPONSE_MODULE]: responseModule,
    [DISPUTE_MODULE]: disputeModule,
  };

  const opooSdk = new OpooSDK(provider, ORACLE, knownModules);

  return { opooSdk };
};
