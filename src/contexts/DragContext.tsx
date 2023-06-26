import { createContext, useContext, useState } from 'react';

export type DragContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

const DragContext = createContext<DragContextType>([
  '',
  () => {
    return;
  },
]);

export function useDrag() {
  return useContext(DragContext);
}

export type Props = {
  children: React.ReactNode;
};

export function DragContextProvider({ children }: Props) {
  return (
    <DragContext.Provider value={useState<string>('')}>
      {children}
    </DragContext.Provider>
  );
}
