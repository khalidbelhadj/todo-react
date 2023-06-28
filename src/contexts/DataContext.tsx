import { Reducer, createContext, useContext, useEffect, useReducer } from 'react'
import { UserData, database } from '../firebase'
import * as utils from '../../utils';

export type DataType = UserData | null;
export type DataContextType = [DataType, React.Dispatch<Action>];

const DataContext = createContext<DataContextType>([
  null,
  () => {
    console.error('DataContext does not have a provider.')
  }
])

export function useData() {
  return useContext(DataContext)
}

export type Props = {
  userId: string,
  children: React.ReactNode
}

export type Action = 
{
  type: 'SET_DATA',
  data: UserData
} |
{
  type: 'ADD_TODO',
  content: string,
  section: string
} |
{
  type: 'DELETE_TODO' | 'TOGGLE_TODO',
  todoId: string
} |
{
  type: 'SWAP_TODOS',
  sourceId: string,
  destinationId: string
} |
{
  type: 'UPDATE_TODO_SECTION',
  todoId: string,
  newSection: string
} |
{
  type: 'ADD_SECTION',
  section: string
} |
{
  type: 'TOGGLE_SHOW_COMPLETED',
};


function reducer(state: DataType, action: Action): DataType {
  if (!state) {
    switch (action.type) {
      case 'SET_DATA':
        console.log("setting data");
        return action.data;
      default:
        console.error("Invalid action type, when state is null");
        return null;
    }
  }

  switch (action.type) {
    case 'SET_DATA':
      console.log("setting data");
      return action.data;
    case 'ADD_TODO':
      return {
        ...state,
        todos: utils.addTodo(state.todos, action.content, action.section)
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: utils.deleteTodo(state.todos, action.todoId)
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: utils.toggleTodo(state.todos, action.todoId)
      }
    case 'SWAP_TODOS':
      return {
        ...state,
        todos: utils.swapTodos(state.todos, action.sourceId, action.destinationId)
      }
    case 'UPDATE_TODO_SECTION':
      return {
        ...state,
        todos: utils.updateTodoSection(state.todos, action.todoId, action.newSection)
      }
    case 'ADD_SECTION':
      return {
        ...state,
        sections: utils.addSection(state.sections, action.section)
      }
    case 'TOGGLE_SHOW_COMPLETED':
      return {
        ...state,
        config: {
          ...state.config,
          showCompleted: !state.config.showCompleted
        }
      }
  }
}

export function DataProvider({ userId, children }: Props) {
  const [state, dispatch] = useReducer<Reducer<DataType, Action>>(reducer, null)

  // Getting the initial data from database 
  useEffect(() => {
    if (userId === '') {
      console.error("userId is empty");
      return;
    }

    const getData = async () => {
      const data = await utils.getUserData(userId);
      if (data) {
        dispatch({ type: 'SET_DATA', data });
      }
    }

    getData();
  }, [dispatch]);

  // Updating the database when the state changes
  useEffect(() => {
    if (state) {
      database.users.doc(userId).set(state);
    }
  }, [state]);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
