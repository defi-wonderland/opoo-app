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
  modules: Modules[];
}

export interface Filter {
  text?: string;
  icon?: IconName;
}

export interface Modules {
  name: string;
  description: string;
  address: string;
  // temporary disabled until we define modules data types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface Items {
  value: string;
  itemCopied: boolean;
}
