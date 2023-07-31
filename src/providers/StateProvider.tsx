import { createContext, useEffect, useState } from 'react';
import { Filter, Modules, RequestData, ThemeName } from '~/types';

type ContextType = {
  modules: Modules[];
  setModules: (val: Modules[]) => void;

  filters: Filter[];
  setFilters: (val: Filter[]) => void;

  requests: RequestData[];
  setRequests: (val: RequestData[]) => void;

  selectedRequest: RequestData | null;
  setSelectedRequest: (val: RequestData | null) => void;

  theme: ThemeName;
  setTheme: (val: ThemeName) => void;

  type: string | null;
  setType: (val: string | null) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const [type, setType] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeName>('light');
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [modules, setModules] = useState<Modules[]>([]);

  // temporary effect and fixed values
  useEffect(() => {
    const requests: RequestData[] = [
      {
        description:
          'What are the key principles and strategies employed by the Optimism Protocol to foster optimism and positivity within individuals and communities?',
        id: '3d4919c6b9f368ae1ec1',
        createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
        requester: '0x388c818cccb192971',
        status: 'Unanswered',
        transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
      },
      {
        description:
          'What are the key principles and strategies employed by the Optimism Protocol to foster optimism and positivity within individuals and communities?',
        id: '3d4919c6b9f368ae1ec2',
        createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
        requester: '0x388c818cccb192972',
        status: 'Finalized',
        transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
      },
      {
        description:
          'What are the key principles and strategies employed by the Optimism Protocol to foster optimism and positivity within individuals and communities?',
        id: '3d4919c6b9f368ae1ec3',
        createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
        requester: '0x388c818cccb192973',
        status: 'Disputed',
        transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
      },
      {
        description:
          'What are the key principles and strategies employed by the Optimism Protocol to foster optimism and positivity within individuals and communities?',
        id: '3d4919c6b9f368ae1ec4',
        createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
        requester: '0x388c818cccb192973',
        status: 'Finalized',
        transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
      },
      {
        description:
          'What are the key principles and strategies employed by the Optimism Protocol to foster optimism and positivity within individuals and communities?',
        id: '3d4919c6b9f368ae1ec5',
        createdAt: 'Mon, 15 May 2023 19:28:47 GMT',
        requester: '0x388c818cccb192973',
        status: 'Disputed',
        transaction: '0xaae85b6e43e533069b2615a94127f9ea5fabed195412725fe',
      },
    ];

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
        description: 'Short description of the module',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Bonded Response Module',
        description: 'Short description of the module',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Bonded Dispute Module',
        description: 'Short description of the module',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Arbitrator Module',
        description: 'Short description of the module',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'Callback Module',
        description: 'Short description of the module',
        address: '0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c',
      },
      {
        name: 'HttpRequestModule',
        description: 'Short description of the module',
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
