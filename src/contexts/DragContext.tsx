import { createContext, useContext, useEffect, useState } from 'react';

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
  const [draggingId, setDraggingId] = useState("");

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setDraggingId('');
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragstart', handleDragOver);
    };
  }, []);

  return (
    <DragContext.Provider value={[draggingId, setDraggingId]}>
      {children}
    </DragContext.Provider>
  );
}
