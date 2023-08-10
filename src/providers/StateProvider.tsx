import { createContext, useEffect, useState } from 'react';

import { Filter, RequestData, ThemeName } from '~/types';
import { THEME_KEY } from '~/utils';

type ContextType = {
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
  const [loading, setLoading] = useState<boolean>(false);

  // temporary effect and fixed values
  useEffect(() => {
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

    setRequests(requests);
    setFilters(filters);
  }, []);

  // Load theme from local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as ThemeName;
    if (!storedTheme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
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
