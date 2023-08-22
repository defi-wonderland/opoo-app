import { createContext, useEffect, useState } from 'react';

import { Filter, RequestData, ThemeName, Modules } from '~/types';
import { THEME_KEY } from '~/utils';

type ContextType = {
  filters: Filter[];
  setFilters: (val: Filter[]) => void;

  requests: RequestData[];
  setRequests: (val: RequestData[]) => void;

  selectedRequest: RequestData;
  setSelectedRequest: (val: RequestData) => void;

  totalRequestCount: number;
  setTotalRequestCount: (val: number) => void;

  selectedModule: Modules;
  setSelectedModule: (val: Modules) => void;

  theme: ThemeName;
  setTheme: (val: ThemeName) => void;

  type: string | null;
  setType: (val: string | null) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  isError: boolean;
  setIsError: (val: boolean) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const [type, setType] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [selectedRequest, setSelectedRequest] = useState<RequestData>({} as RequestData);
  const [totalRequestCount, setTotalRequestCount] = useState<number>(0);
  const [selectedModule, setSelectedModule] = useState<Modules>({} as Modules);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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
        totalRequestCount,
        setTotalRequestCount,
        selectedModule,
        setSelectedModule,
        theme,
        setTheme,
        type,
        setType,
        loading,
        setLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
