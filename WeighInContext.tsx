import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the weigh-in record
interface WeighIn {
  id: string;
  date: string;
  weight: number;
}

interface WeighInContextProps {
  weighIns: WeighIn[];
  addWeighIn: (weight: number) => void;
  deleteWeighIn: (id: string) => void;
}

// Create the context with default values
const WeighInContext = createContext<WeighInContextProps>({
  weighIns: [],
  addWeighIn: () => {},
  deleteWeighIn: () => {},
});

// Create the provider component
export const WeighInProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weighIns, setWeighIns] = useState<WeighIn[]>([]);

  const addWeighIn = (weight: number) => {
    const newWeighIn: WeighIn = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      weight,
    };
    setWeighIns((prevWeighIns) => [...prevWeighIns, newWeighIn]);
  };

  const deleteWeighIn = (id: string) => {
    setWeighIns((prevWeighIns) => prevWeighIns.filter((weighIn) => weighIn.id !== id));
  };

  return (
    <WeighInContext.Provider value={{ weighIns, addWeighIn, deleteWeighIn }}>
      {children}
    </WeighInContext.Provider>
  );
};

// Custom hook to use the WeighInContext
export const useWeighInContext = () => {
  return useContext(WeighInContext);
};
