import { useEffect, useState } from "react";
import Header from "./Header";
import TodoListsContainer from "./TodoListsContainer";

export default function App() {
  const [showCompleted, setShowCompleted] = useState<boolean>(
    JSON.parse(localStorage.getItem("showCompleted") || "false"),
  );

  useEffect(() => {
    localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
  });

  return (
    <>
      <Header
        showCompleted={showCompleted}
        toggleShowCompleted={() => setShowCompleted((prev) => !prev)}
      />

      <TodoListsContainer showCompleted={showCompleted} />
    </>
  );
}
