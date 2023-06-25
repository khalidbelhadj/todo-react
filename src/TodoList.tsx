import { Dispatch, useEffect, useRef } from 'react';
import AddTodoButton from './AddTodoButton';
import TodoElement from './TodoElement';
import { TodoItem } from './typings/typings';
import { v4 } from 'uuid';
import { isWhitespace } from '../public/utils';

export type Props = {
  sectionTitle: string;
  todos: TodoItem[];
  showCompleted: boolean;
  draggingElementId: string;
  setTodos: Dispatch<React.SetStateAction<TodoItem[]>>;
  setDraggingElementId: (id: string) => void;
};

export default function TodoList({
  sectionTitle,
  todos,
  showCompleted,
  draggingElementId,
  setTodos,
  setDraggingElementId,
}: Props) {
  const todosRef = useRef<HTMLDivElement[]>([]);

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    let insideId = '';
    const otherTodos = todosRef.current.filter(
      (todo) => todo['id'] !== draggingElementId
    );

    for (const todo of otherTodos) {
      const { top, bottom } = todo.getBoundingClientRect();
      if (top < event.clientY && event.clientY < bottom) {
        insideId = todo.id;
        break;
      }
    }

    if (insideId === '') {
      changeSection(draggingElementId, sectionTitle);
    } else {
      swapTodos(draggingElementId, insideId);
    }
  };

  const addTodo = (content: string, section: string) => {
    if (content.split('').some((char) => !isWhitespace(char))) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: v4(),
          content,
          done: false,
          section: section,
        },
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  const toggleDone = (id: string) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
      setTodos(newTodos);
    }
  };

  const swapTodos = (id: string, otherId: string) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    const beforeTodo = newTodos.find((todo) => todo.id === otherId);

    if (todo && beforeTodo) {
      if (todo.section !== beforeTodo.section) {
        todo.section = beforeTodo.section;
      }

      const index = newTodos.indexOf(todo);
      const beforeIndex = newTodos.indexOf(beforeTodo);

      newTodos.splice(index, 1);
      newTodos.splice(beforeIndex, 0, todo);

      setTodos(newTodos);
    }
  };

  const changeSection = (id: string, newSection: string) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);

    if (todo) {
      todo.section = newSection;
      setTodos(newTodos);
    }
  };

  useEffect(() => {
    todosRef.current = todosRef.current.filter((todo) => todo !== null);
  }, [todos]);

  const filteredTodos = todos.filter(
    (todo) => todo.section === sectionTitle && (showCompleted || !todo.done)
  );

  return (
    <div className="todo-list-container"
          key={sectionTitle}
    >

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
                toggleDone={toggleDone}
                deleteTodo={deleteTodo}
                setDraggingId={setDraggingElementId}
                dragging={todo.id === draggingElementId}
                ref={(el: HTMLDivElement) => (todosRef.current[i] = el)}
              />
            </>
          );
        })}

        <AddTodoButton addTodo={(content) => addTodo(content, sectionTitle)} />
      </div>
    </div>
  );
}
