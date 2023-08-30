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
  finalizedResponse: FinalizedResponse;
}

export interface Response {
  response: string;
  proposer: string;
  responseId: string;
  dispute: string;
  finalized: boolean;
}

export interface FinalizedResponse {
  createdAt: number;
  proposer: string;
  requestId: string;
  disputeId: string;
  response: string;
}

export interface RawResponse {
  createdAt: string;
  response: string;
  proposer: string;
  requestId: string;
  disputeId: string;
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
  data?: { name: string; value: string }[];
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
  name: string;
  type: string;
}

export interface EnsNames {
  [requestId: string]: {
    requester: string | null;
    responses: { proposer: string | null }[];
  };
}

export interface ReturnedTypes {
  [moduleAddress: string]: TypeResults[] | undefined;
}
