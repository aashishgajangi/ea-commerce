'use client';

import { createContext, useContext, ReactNode } from 'react';

const CurrencyContext = createContext<string>('USD');

export function CurrencyProvider({ 
  children, 
  currency 
}: { 
  children: ReactNode;
  currency: string;
}) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const currency = useContext(CurrencyContext);
  if (!currency) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return currency;
}
