import AddTodoButton from "./AddTodoButton";
import TodoElement from "./TodoElement";
import { useEffect, useRef } from "react";
import { useDrag } from "../contexts/DragContext";
import { useData } from "../contexts/DataContext";

export type Props = { sectionTitle: string };

export default function TodoList({ sectionTitle }: Props) {
  const [state, dispatch] = useData();
  const [draggingId] = useDrag();
  const todosRef = useRef<HTMLDivElement[]>([]);

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    let dragingOverId = "";
    const otherTodos = todosRef.current.filter(
      (todo) => todo["id"] !== draggingId,
    );

    for (const todo of otherTodos) {
      const { top, bottom } = todo.getBoundingClientRect();
      if (top < event.clientY && event.clientY < bottom) {
        dragingOverId = todo.id;
        break;
      }
    }

    if (dragingOverId === "") {
      dispatch({
        type: "UPDATE_TODO_SECTION",
        todoId: draggingId,
        newSection: sectionTitle,
      });
    } else {
      dispatch({
        type: "SWAP_TODOS",
        sourceId: draggingId,
        destinationId: dragingOverId,
      });
    }
  };

  useEffect(() => {
    todosRef.current = todosRef.current.filter((todo) => todo !== null);
  }, [state]);

  const filteredTodos = state?.todos.filter(
    (todo) =>
      todo.section === sectionTitle &&
      (state?.config.showCompleted || !todo.done),
  ) || [];

  return (
    <div className="todo-list-container" key={sectionTitle}>
      <div className="todo-list" onDragOver={dragOver}>
        <div className="flex">
          <div className="todo-list-title">{sectionTitle}</div>

          {state?.config.showCompleted && (
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
                ref={(el: HTMLDivElement) => (todosRef.current[i] = el)}
              />
            </>
          );
        })}

        <AddTodoButton
          addTodo={(content: string) =>
            dispatch({ type: "ADD_TODO", content, section: sectionTitle })}
        />
      </div>
    </div>
  );
}
