import { Constants } from '~/types';

const constants: Constants = {
  ORACLE: '0x19cEcCd6942ad38562Ee10bAfd44776ceB67e923',
  docsLink: 'docs.prophet.tech',
};

export const getConstants = (): Constants => {
  return constants;
};
