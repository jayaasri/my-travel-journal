import React, { createContext, useState, useContext } from 'react';
import data from './data/data';

export const EntryContext = createContext(); // Export the context

export const EntryProvider = ({ children }) => {
  const [entries, setEntries] = useState(data); // Initialize with data from data.js

  return (
    <EntryContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => useContext(EntryContext);
