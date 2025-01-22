'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type UrlParamsType = {
  name: string;
  id: string;
};

type UrlParamsContextType = {
  urlParams: UrlParamsType;
  setUrlParams: (params: UrlParamsType) => void;
};

const UrlParamsContext = createContext<UrlParamsContextType | undefined>(undefined);

export function UrlParamsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [urlParams, setUrlParams] = useState<UrlParamsType>({
    name: searchParams.get('name') || '',
    id: searchParams.get('id') || ''
  });

  useEffect(() => {
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    if (name || id) {
      setUrlParams({
        name: name || '',
        id: id || ''
      });
    }
  }, [searchParams]);

  return (
    <UrlParamsContext.Provider value={{ urlParams, setUrlParams }}>
      {children}
    </UrlParamsContext.Provider>
  );
}

export function useUrlParams() {
  const context = useContext(UrlParamsContext);
  if (!context) {
    throw new Error('useUrlParams must be used within UrlParamsProvider');
  }
  return context;
}
