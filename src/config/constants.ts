import { Constants } from '~/types';

const constants: Constants = {
  ORACLE: '0xbDa53C800046EFa4d4B06cF9f6D957e691aF7354',
  docsLink: 'docs.prophet.tech',
};

export const getConstants = (): Constants => {
  return constants;
};
