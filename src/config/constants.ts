import { Constants } from '~/types';

const constants: Constants = {
  ORACLE: '0x66ada61779038adb405b79f77e33d5ad64040691',
  docsLink: 'docs.prophet.tech',
};

export const getConstants = (): Constants => {
  return constants;
};
