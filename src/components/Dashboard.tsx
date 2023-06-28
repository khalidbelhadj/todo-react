import Header from './Header';
import TodoListsContainer from './TodoListsContainer';
import { DragContextProvider } from '../contexts/DragContext';
import { DataProvider } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <DataProvider userId={currentUser ? currentUser.uid : ''}>
      <Header />
      <DragContextProvider>
        <TodoListsContainer />
      </DragContextProvider>
    </DataProvider>
  );
}
