import { useEffect } from 'react';
import Header from './Header';
import TodoListsContainer from './TodoListsContainer';
import {
  UserConfigProvider,
  useUserConfig,
} from '../contexts/UserConfigContext';
import { DragContextProvider } from '../contexts/DragContext';

export default function Dashboard() {
  const { showCompleted } = useUserConfig();

  useEffect(() => {
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
  });

  return (
    <UserConfigProvider>
      <Header />
      <DragContextProvider>
        <TodoListsContainer />
      </DragContextProvider>
    </UserConfigProvider>
  );
}
