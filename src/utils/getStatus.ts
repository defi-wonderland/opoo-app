import { RequestFullData } from 'opoo-sdk';

import { ID_ZERO, getDate } from '~/utils';
import { StatusName } from '~/types';

export const getStatus = (requests: RequestFullData): StatusName => {
  if (requests.finalizedResponse.response !== '0x') return 'finalized';
  if (Number(requests.disputeStatus) !== 0) return 'disputed';
  if (requests.responses.length > 0) return 'message';

  return 'unanswered';
};

export const getDispute = (disputeId: string, timestamp: string): string => {
  if (disputeId === ID_ZERO) return '—';

  return `Active since ${getDate(timestamp)}`;
};
