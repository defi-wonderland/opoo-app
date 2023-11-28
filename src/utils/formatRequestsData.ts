import { RequestFullData } from '@defi-wonderland/prophet-sdk';
import { Address } from 'viem';

import { EnsNames, RequestData } from '~/types';
import {
  Metadata,
  decodeData,
  formatModuleData,
  formatModuleName,
  getDispute,
  getStatus,
  isFinalResponse,
  Timestamps,
} from '~/utils';

export const formatRequestsData = (
  requestsFullData: RequestFullData[],
  ensNames: EnsNames,
  metadatas: Metadata[],
  timestamps: Timestamps,
): RequestData[] => {
  const requests: RequestData[] = requestsFullData.map((fullRequest, index) => {
    const {
      requestWithId: {
        requestId,
        request: {
          nonce,
          requester,
          requestModule,
          responseModule,
          disputeModule,
          resolutionModule,
          finalityModule,
          requestModuleData,
          responseModuleData,
          disputeModuleData,
          resolutionModuleData,
          finalityModuleData,
        },
      },
      finalizedResponse,
      responses,
      disputeModuleName,
      requestModuleName,
      finalityModuleName,
      responseModuleName,
      resolutionModuleName,
    } = fullRequest;
    const { returnedTypes, description, responseType } = metadatas[index] || {};
    let requestData: string[] = [],
      responseData: string[] = [],
      disputeData: string[] = [],
      finalityData: string[] = [],
      resolutionData: string[] = [];

    if (returnedTypes) {
      requestData = decodeData(
        returnedTypes[requestModule.toString().toLocaleLowerCase()],
        requestModuleData as Address,
      );
      responseData = decodeData(
        returnedTypes[responseModule.toString().toLocaleLowerCase()],
        responseModuleData as Address,
      );
      disputeData = decodeData(
        returnedTypes[disputeModule.toString().toLocaleLowerCase()],
        disputeModuleData as Address,
      );
      finalityData = decodeData(
        returnedTypes[finalityModule.toString().toLocaleLowerCase()],
        finalityModuleData as Address,
      );
      resolutionData = decodeData(
        returnedTypes[resolutionModule.toString().toLocaleLowerCase()],
        resolutionModuleData as Address,
      );
    }

    return {
      id: requestId.toString(),
      description: description || 'Not supplied',
      createdAt: timestamps[requestId.toString()].request.toString(),
      requester: ensNames[requestId.toString()].requester || requester.toString(),
      nonce: nonce.toString(),
      status: getStatus(fullRequest),

      // Responses section
      responses: responses.map((response, responseIndex) => ({
        response: responseType
          ? decodeData([{ name: '', type: responseType }], response.response.response as Address)[0].toString()
          : response.response.response.toString(), // decoded response if responseType is defined
        proposer:
          ensNames[requestId.toString()].responses[responseIndex].proposer?.toString() ||
          response.response.proposer.toString(),
        responseId: response.responseId.toString(),
        dispute: getDispute(
          response.disputeId.toString(),
          timestamps[requestId.toString()].responses[responseIndex],
          isFinalResponse(response, finalizedResponse),
        ),
        finalized: isFinalResponse(response, finalizedResponse),
      })),

      // Finalized response
      finalizedResponse: finalizedResponse && {
        // Note: this is required to clean up the fetched the data format
        createdAt: Number(timestamps[requestId.toString()].finalizedResponse),
        proposer: finalizedResponse.response.proposer.toString(),
        disputeId: finalizedResponse.disputeId.toString(),
        response: finalizedResponse.response.response.toString(),
        requestId: finalizedResponse.requestId.toString(),
      },

      // Modules section
      modules: [
        {
          name: formatModuleName(requestModuleName),
          address: requestModule.toString(),
          data: formatModuleData(returnedTypes, requestModule.toString(), requestModuleData.toString(), requestData),
        },
        {
          name: formatModuleName(responseModuleName),
          address: responseModule.toString(),
          data: formatModuleData(returnedTypes, responseModule.toString(), responseModuleData.toString(), responseData),
        },
        {
          name: formatModuleName(disputeModuleName),
          address: disputeModule.toString(),
          data: formatModuleData(returnedTypes, disputeModule.toString(), disputeModuleData.toString(), disputeData),
        },
        {
          name: formatModuleName(resolutionModuleName),
          address: resolutionModule.toString(),
          data: formatModuleData(
            returnedTypes,
            resolutionModule.toString(),
            resolutionModuleData.toString(),
            resolutionData,
          ),
        },
        {
          name: formatModuleName(finalityModuleName),
          address: finalityModule.toString(),
          data: formatModuleData(returnedTypes, finalityModule.toString(), finalityModuleData.toString(), finalityData),
        },
      ],
    };
  });

  return requests.reverse();
};
