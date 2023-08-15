import { IconName } from '~/components';

export type StatusName = 'disputed' | 'message' | 'unanswered' | 'finalized';

export interface RequestData {
  description: string;
  id: string;
  nonce: string;
  createdAt: string;
  requester: string;
  status: StatusName;
  responses: Response[];
  modules: Modules[];
  finalizedResponse: {
    createdAt: number;
    proposer: string;
    requestId: string;
    disputeId: string;
    response: string;
  };
}

export interface Response {
  response: string;
  proposer: string;
  requestId: string;
  dispute: string;
}

export interface Filter {
  text?: string;
  icon?: IconName;
}

export interface Items {
  value: string;
  itemCopied: boolean;
}

export interface Modules {
  name: string;
  address: string;
  // temporary any until we define all modules data types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: RequestModuleData | any;
}

export interface RequestModuleData {
  url: string;
  method: string;
  body: string;
  accountingExtension: string;
  paymentToken: string;
  paymentAmount: string;
}

export interface TypeResults {
  name?: string;
  type: string;
}

export interface EnsNames {
  [requestId: string]: {
    requester: string | null;
    responses: { proposer: string | null }[];
  };
}
