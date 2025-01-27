import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimeIntervalContextType {
  currentInterval: number;
  setCurrentInterval: (interval: number) => void;
}

const TimeIntervalContext = createContext<TimeIntervalContextType | undefined>(undefined);

export function TimeIntervalProvider({ children }: { children: ReactNode }) {
  const [currentInterval, setCurrentInterval] = useState(1);

  return (
    <TimeIntervalContext.Provider value={{ currentInterval, setCurrentInterval }}>
      {children}
    </TimeIntervalContext.Provider>
  );
}

export function useTimeInterval() {
  const context = useContext(TimeIntervalContext);
  if (context === undefined) {
    throw new Error('useTimeInterval must be used within a TimeIntervalProvider');
  }
  return context;
}