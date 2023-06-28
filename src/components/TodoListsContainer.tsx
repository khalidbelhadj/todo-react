import TodoList from "./TodoList";
import AddSectionButton from "./AddSectionButton";
import { useData } from "../contexts/DataContext";

export default function TodoListsContainer() {
  const [state,] = useData();

  return (
    <div className="sections-container">

      {state?.sections.map((section) => (
        <TodoList
          key={section}
          sectionTitle={section}
        />
      ))}

      <AddSectionButton />
    </div>
  );
}
