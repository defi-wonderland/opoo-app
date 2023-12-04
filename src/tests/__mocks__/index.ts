/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';
import { ProphetSDKMock } from './prophetSdk.ts';

// ------------------------------- Library Mocks ------------------------------- //
// Mock for ethers.JsonRpcProvider()
vi.mock('ethers', async () => {
  const actual: any = await vi.importActual('ethers');
  return {
    ...actual,
    ethers: {
      JsonRpcProvider: vi.fn(),
    },
  };
});

// Mock for client.getEnsName() (from viem)
vi.mock('~/config', async () => {
  const actual: any = await vi.importActual('~/config');
  return {
    ...actual,
    client: {
      getEnsName: vi.fn().mockResolvedValue('test.eth'),
    },
    publicClient: {
      getBlock: vi.fn().mockResolvedValue(1700000),
    },
  };
});

// Mock for ProphetSDK
vi.mock('@defi-wonderland/prophet-sdk', async () => {
  const actual: any = await vi.importActual('@defi-wonderland/prophet-sdk');
  return {
    ...actual,
    ProphetSDK: ProphetSDKMock,
  };
});

// ------------------------------- Exports ------------------------------- //
export * from './data';
export * from './prophetSdk.ts';
