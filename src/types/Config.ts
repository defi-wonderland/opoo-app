export interface Env {
  RPC_URL: string;
  ENS_RPC_URL: string;
}

export interface Constants {
  ORACLE: string;
}

export interface Config extends Env, Constants {}
