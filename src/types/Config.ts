export interface Env {
  RPC_URL: string;
  ENS_RPC_URL: string;
  DEV_MODE: boolean;
}

export interface Constants {
  ORACLE: string;
  docsLink: string;
}

export interface Config extends Env, Constants {}
