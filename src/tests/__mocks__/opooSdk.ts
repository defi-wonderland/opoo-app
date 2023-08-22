import { NUMBER_OF_REQUESTS, fullRequestDataMock, moduleDataMock } from '~/tests/__mocks__';

export class OpooSDKMock {
  public batching: BatchingMock;
  public helpers: HelpersMock;
  public ipfs: MockIpfs;

  constructor() {
    this.batching = new BatchingMock();
    this.helpers = new HelpersMock();
    this.ipfs = new MockIpfs();
  }
}

class BatchingMock {
  public getFullRequestData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fullRequestDataMock);
      });
    });
  }
}

class HelpersMock {
  public totalRequestCount(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(NUMBER_OF_REQUESTS);
      });
    });
  }
}

class MockIpfs {
  public getMetadata() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(moduleDataMock);
      });
    });
  }
}
