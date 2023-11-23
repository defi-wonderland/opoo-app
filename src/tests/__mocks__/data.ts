export const NUMBER_OF_REQUESTS = 1;

export const fullRequestDataMock = [
  {
    requestWithId: {
      blockNumber: '0',
      ipfsHash: '0x0000000000000000000000000000000000000000',
      requestId: '0',
      request: {
        requestModuleData: '0x',
        responseModuleData: '0x',
        disputeModuleData: '0x',
        resolutionModuleData: '0x',
        finalityModuleData: '0x',
        requestModule: '0x0000000000000000000000000000000000000000',
        responseModule: '0x0000000000000000000000000000000000000001',
        disputeModule: '0x0000000000000000000000000000000000000002',
        resolutionModule: '0x0000000000000000000000000000000000000003',
        finalityModule: '0x0000000000000000000000000000000000000004',
        requester: '0x0000000000000000000000000000000000000000',
        nonce: '0',
      },
    },
    finalizedResponse: null,
    responses: [],
    disputeStatus: 0,
    disputeModuleName: '',
    requestModuleName: '',
    finalityModuleName: '',
    responseModuleName: '',
    resolutionModuleName: '',
  },
];

export const moduleDataMock = {
  responseType: '',
  description: '',
  returnedTypes: {},
};
