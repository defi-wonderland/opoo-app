import { RequestFullData } from 'opoo-sdk/dist/batching';
import { StatusName } from '~/types';

export const getStatus = (requests: RequestFullData): StatusName => {
  if (requests.finalizedResponse.response !== '0x') return 'finalized';
  if (Number(requests.disputeStatus) !== 0) return 'disputed';
  if (requests.responses.length > 0) return 'message';

  return 'unanswered';
};
