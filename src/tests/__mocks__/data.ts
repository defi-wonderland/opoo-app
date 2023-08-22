export const NUMBER_OF_REQUESTS = 1;

export const fullRequestDataMock = [
  {
    requestId: '0x0000000000000000000000000000000000000000',
    request: {
      requestModuleData: '0x',
      responseModuleData: '0x',
      disputeModuleData: '0x',
      resolutionModuleData: '0x',
      finalityModuleData: '0x',
      ipfsHash: '0x0000000000000000000000000000000000000000',
      requestModule: '0x0000000000000000000000000000000000000000',
      responseModule: '0x0000000000000000000000000000000000000001',
      disputeModule: '0x0000000000000000000000000000000000000002',
      resolutionModule: '0x0000000000000000000000000000000000000003',
      finalityModule: '0x0000000000000000000000000000000000000004',
      requester: '0x0000000000000000000000000000000000000000',
      nonce: '0',
      createdAt: '0',
      requestId: '0',
    },
    responses: [],
    finalizedResponse: {
      createdAt: '0',
      proposer: '0x0000000000000000000000000000000000000000',
      requestId: '0x0000000000000000000000000000000000000000',
      disputeId: '0x0000000000000000000000000000000000000000',
      response: '0x0000000000000000000000000000000000000000',
    },
    disputeStatus: 0,
  },
];

export const moduleDataMock = {
  responseType: '',
  description: '',
  returnedTypes: {},
};
