import { IconName } from '~/components';

export type StatusName = 'disputed' | 'message' | 'unanswered' | 'finalized';

export interface RequestData {
  description: string;
  id: string;
  nonce: string;
  createdAt: string;
  requester: string;
  status: StatusName;
  responses: string[][];
}

export interface Filter {
  text?: string;
  icon?: IconName;
}

export interface Modules {
  name: string;
  description: string;
  address: string;
}
