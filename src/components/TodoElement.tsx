import { TodoItem } from "../typings/typings";
import DeleteTodoButton from "./DeleteTodoButton";
import React from "react";
import { useDrag } from "../contexts/DragContext";
import { useData } from "../contexts/DataContext";

export interface Props {
  todo: TodoItem;
}

const TodoElement = React.forwardRef(
  ({ todo }: Props, ref) => {
    const [draggingId, setDraggingId] = useDrag();
    const [, dispatch] = useData();

    return (
      <div
        key={todo.id}
        className={"todo-item group/todo-item " +
          (draggingId === todo.id && "dragging")}
        draggable={true}
        id={todo.id}
        onDragStart={() => setDraggingId(todo.id)}
        ref={ref}
      >
        <button
          type="button"
          id={todo.id + "-checkbox"}
          className="group/checkbox"
          name={todo.id}
          onClick={() =>
            dispatch({
              type: "TOGGLE_TODO",
              todoId: todo.id,
            })}
          draggable={false}
        >
          <div className={"checkbox-circle " + (todo.done && "completed")}>
            <svg>
              <path
                fill="currentColor"
                d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
              >
              </path>
            </svg>
          </div>
        </button>

        <label draggable={false}>
          {/* TODO: Change this to a div */}
          {todo.content}
        </label>

        <DeleteTodoButton
          deleteTodo={() =>
            dispatch({
              type: "DELETE_TODO",
              todoId: todo.id,
            })}
        />
      </div>
    );
  },
);

export default TodoElement;
