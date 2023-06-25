import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./typings/typings";
import AddSectionButton from "./AddSectionButton";
import { isWhitespace } from "../public/utils";

export type Props = {
  showCompleted: boolean;
};

export default function TodoListsContainer({ showCompleted }: Props) {
  const [todos, setTodos] = useState<TodoItem[]>(
    JSON.parse(localStorage.getItem("todos") || "[]"),
  );
  const [sections, setSections] = useState<string[]>(
    JSON.parse(localStorage.getItem("sections") || '["default"]'),
  );
  const addSection = (section: string) => {
    if (section.split("").some((char) => !isWhitespace(char))) {
      setSections((prevSections) => [...prevSections, section]);
    }
  };

  const deleteSection = (section: string) =>
    setSections((prevSections) => prevSections.filter((s) => s !== section));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("sections", JSON.stringify(sections));
  });

  useEffect(() => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDraggingElementId("");
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragstart', handleDragOver);
    };
  }, []);

  const [draggingElementId, setDraggingElementId] = useState<string>("");

  return (
    <div className="sections-container"
    >
      {sections.map((section) => (
        <TodoList
          key={section}
          sectionTitle={section}
          todos={todos}
          setTodos={setTodos}
          showCompleted={showCompleted}
          setDraggingElementId={setDraggingElementId}
          draggingElementId={draggingElementId}
        />
      ))}

      <AddSectionButton addSection={addSection} />
    </div>
  );
}
