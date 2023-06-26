import { Dispatch, useEffect, useRef } from 'react';
import AddTodoButton from './AddTodoButton';
import TodoElement from './TodoElement';
import { TodoItem } from '../typings/typings';
import { useUserConfig } from '../contexts/UserConfigContext';
import { useDrag } from '../contexts/DragContext';
import {
  addTodo,
  changeSection,
  swapTodos,
  toggleDone,
  deleteTodo,
} from '../../public/utils';

export type Props = {
  sectionTitle: string;
  todos: TodoItem[];
  setTodos: Dispatch<React.SetStateAction<TodoItem[]>>;
};

export default function TodoList({ sectionTitle, todos, setTodos }: Props) {
  const todosRef = useRef<HTMLDivElement[]>([]);
  const { showCompleted } = useUserConfig();
  const [draggingId] = useDrag();

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    let dragingOverId = '';
    const otherTodos = todosRef.current.filter(
      (todo) => todo['id'] !== draggingId
    );

    for (const todo of otherTodos) {
      const { top, bottom } = todo.getBoundingClientRect();
      if (top < event.clientY && event.clientY < bottom) {
        dragingOverId = todo.id;
        break;
      }
    }

    if (dragingOverId === '') {
      setTodos(changeSection(todos, draggingId, sectionTitle));
    } else {
      setTodos(swapTodos(todos, draggingId, dragingOverId));
    }
  };

  useEffect(() => {
    todosRef.current = todosRef.current.filter((todo) => todo !== null);
  }, [todos, showCompleted]);

  const filteredTodos = todos.filter(
    (todo) => todo.section === sectionTitle && (showCompleted || !todo.done)
  );

  return (
    <div className="todo-list-container" key={sectionTitle}>
      <div className="todo-list" onDragOver={dragOver}>
        <div className="flex">
          <div className="todo-list-title">{sectionTitle}</div>

          {showCompleted && (
            <div className="ml-auto font-mono">
              {filteredTodos.filter((todo) => todo.done).length}/
              {filteredTodos.length}
            </div>
          )}
        </div>
        {filteredTodos.map((todo, i) => {
          return (
            <>
              <TodoElement
                todo={todo}
                toggleDone={(id: string) => setTodos(toggleDone(todos, id))}
                deleteTodo={(id: string) => setTodos(deleteTodo(todos, id))}
                ref={(el: HTMLDivElement) => (todosRef.current[i] = el)}
              />
            </>
          );
        })}

        <AddTodoButton
          addTodo={(content) => setTodos(addTodo(todos, content, sectionTitle))}
        />
      </div>
    </div>
  );
}
