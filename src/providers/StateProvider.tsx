import { createContext, useEffect, useState } from 'react';
import { AbiCoder, toUtf8String } from 'ethers';

import { Filter, Modules, RequestData, ThemeName } from '~/types';
import { getDate, getStatus, truncateString } from '~/utils';
import { useOpooSdk } from '~/hooks';

type ContextType = {
  modules: Modules[];
  setModules: (val: Modules[]) => void;

  filters: Filter[];
  setFilters: (val: Filter[]) => void;

  requests: RequestData[];
  setRequests: (val: RequestData[]) => void;

  selectedRequest: RequestData;
  setSelectedRequest: (val: RequestData) => void;

  theme: ThemeName;
  setTheme: (val: ThemeName) => void;

  type: string | null;
  setType: (val: string | null) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const [type, setType] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeName>('light');
  const [selectedRequest, setSelectedRequest] = useState<RequestData>({} as RequestData);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [modules, setModules] = useState<Modules[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { opooSdk } = useOpooSdk();

  const getRequests = async () => {
    setLoading(true);
    // temporary logs
    console.log('loading requests...');
    try {
      console.log('opooSdk', opooSdk);
      const rawRequests = await opooSdk.batching.getFullRequestData(128, 9);
      console.log('rawFulRequests', rawRequests);

      const requestsData = rawRequests.map(async (fulRequest) => {
        const returnTypes = await opooSdk.modules.getNamedDecodeRequestReturnTypes(fulRequest.request.requestModule);
        const decoded = AbiCoder.defaultAbiCoder().decode(
          returnTypes[0].components,
          fulRequest.request.requestModuleData,
        );
        return decoded[2];
      });
      const requestsDataResults = await Promise.all(requestsData);

      const requests: RequestData[] = rawRequests.map((fulRequest, index) => ({
        id: fulRequest.requestId,
        description: requestsDataResults[index],
        createdAt: getDate(fulRequest.request.createdAt),
        requester: fulRequest.request.requester,
        nonce: fulRequest.request.nonce.toString(),
        status: getStatus(fulRequest),

        // Responses section
        responses: fulRequest.responses.map((response) => [
          /* response  */ toUtf8String(response.response), // decoded response
          /* proposer  */ truncateString(response.proposer, 4),
          /* requestId */ truncateString(response.requestId, 9),
          /* createdAt */ getDate(response.createdAt),
        ]),
      }));

      setLoading(false);

      return requests.reverse();
    } catch (error) {
      console.error('Error loading requests:', error);
      setLoading(false);
      return [];
    }
  };

  // temporary effect and fixed values
  useEffect(() => {
    getRequests().then((requests) => setRequests(requests));

    // const filters: Filter[] = [
    //   { text: 'Satus', icon: 'status' },
    //   { text: 'All' },
    //   { text: 'Created date', icon: 'created-date' },
    //   { text: 'less than' },
    //   { text: '3 days ago' },
    //   { text: 'Requester', icon: 'requester' },
    //   { text: 'search result' },
    //   { text: 'ID', icon: 'tag' },
    //   { text: 'search result' },
    //   { icon: 'close' },
    // ];

    const modules = [
      {
        name: 'Http Request Module',
        description:
          'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Bonded Response Module',
        description:
          'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Bonded Dispute Module',
        description:
          'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Arbitrator Module',
        description:
          'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Callback Module',
        description:
          'The HTTP Request module on Optimism enables developers to send and receive HTTP requests to interact with external servers or APIs.',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
    ];

    setRequests(requests);
    setFilters(filters);
    setModules(modules);
  }, []);

  return (
    <StateContext.Provider
      value={{
        modules,
        setModules,
        filters,
        setFilters,
        requests,
        setRequests,
        selectedRequest,
        setSelectedRequest,
        theme,
        setTheme,
        type,
        setType,
        loading,
        setLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
