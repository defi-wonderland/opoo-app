import { StatusName } from '~/types';

export const statusMsg = (status: StatusName): string => {
  switch (status) {
    case 'message':
      return 'Has response';
    case 'finalized':
      return 'Finalized';
    case 'disputed':
      return 'Disputed';
    case 'unanswered':
      return 'Unanswered';
  }
};
