import { ReturnedTypes } from '~/types';

export const formatModuleData = (
  returnedTypes: ReturnedTypes,
  moduleAddress: string,
  moduleData: string,
  decodedData: string[],
) => {
  if (returnedTypes && decodedData.length > 0) {
    return typeof decodedData[0] === 'string'
      ? // if the decoded data is a string, it means that the module is a single value module
        [{ name: returnedTypes?.[moduleAddress]?.[0].name || '', value: moduleData }]
      : // if the decoded data is an object, it means that the module has multiple values
        Object.entries(decodedData[0]).map(([key, value]) => ({
          name: key,
          value: value?.toString() || '',
        }));
  } else {
    // if the returnedTypes is undefined, just return the raw data
    return [{ name: 'Raw data', value: moduleData }];
  }
};
