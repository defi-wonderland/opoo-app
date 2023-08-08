export interface Env {
  RPC_URL: string;
}

export interface Constants {
  ORACLE: string;
  REQUEST_MODULE: string;
  DISPUTE_MODULE: string;
  RESPONSE_MODULE: string;
}

export interface Config extends Env, Constants {}
