import { IconName } from '~/components';

export type StatusName = 'green' | 'red' | 'yellow'; // temporary generic values

export interface CardData {
  description: string;
  id: string;
  createdAt: string;
  requester: string;
  status: StatusName;
}

export interface Filter {
  text?: string;
  icon?: IconName;
}
