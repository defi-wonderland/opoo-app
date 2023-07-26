import { IconName } from '~/components';

export interface CardData {
  description: string;
  id: string;
  createdAt: string;
  requester: string;
}

export interface Filter {
  text?: string;
  icon?: IconName;
}
