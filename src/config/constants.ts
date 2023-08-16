import { Constants } from '~/types';

const constants: Constants = {
  ORACLE: '0x1f10F3Ba7ACB61b2F50B9d6DdCf91a6f787C0E82',
  REQUEST_MODULE: '0x2a810409872AfC346F9B5b26571Fd6eC42EA4849',
  RESPONSE_MODULE: '0x38a024C0b412B9d1db8BC398140D00F5Af3093D4',
  DISPUTE_MODULE: '0x525C7063E7C20997BaaE9bDa922159152D0e8417',
};
export const getConstants = (): Constants => {
  return constants;
};
