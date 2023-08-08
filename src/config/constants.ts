import { Constants } from '~/types';

const constants: Constants = {
  ORACLE: '0xD0141E899a65C95a556fE2B27e5982A6DE7fDD7A',
  REQUEST_MODULE: '0x3347B4d90ebe72BeFb30444C9966B2B990aE9FcB',
  RESPONSE_MODULE: '0xA7c59f010700930003b33aB25a7a0679C860f29c',
  DISPUTE_MODULE: '0x22753E4264FDDc6181dc7cce468904A80a363E44',
};
export const getConstants = (): Constants => {
  return constants;
};
