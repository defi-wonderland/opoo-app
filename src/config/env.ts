import { Env } from '~/types';

export const getEnv = (): Env => {
  const { VITE_RPC_URL, VITE_ENS_RPC_URL, VITE_ALLOW_DEV_MODE } = import.meta.env;

  return {
    RPC_URL: VITE_RPC_URL,
    ENS_RPC_URL: VITE_ENS_RPC_URL,
    DEV_MODE: VITE_ALLOW_DEV_MODE !== 'false', // return false only if explicitly set to false
  };
};
