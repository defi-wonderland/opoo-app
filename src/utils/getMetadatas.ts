import { RequestFullData, OpooSDK } from 'opoo-sdk';
import { ReturnedTypes } from '~/types';

export interface Metadata {
  responseType: string;
  description: string;
  returnedTypes: ReturnedTypes;
}

export const getMetadatas = async (requests: RequestFullData[], opooSdk: OpooSDK): Promise<Metadata[]> => {
  const metadatas = [];
  for (const request of requests) {
    const metadata: Metadata = await opooSdk.ipfs.getMetadata(request.request.ipfsHash);
    metadatas.push(metadata);
  }
  return metadatas;
};
