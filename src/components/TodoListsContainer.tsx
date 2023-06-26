import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import { TodoItem } from '../typings/typings';
import AddSectionButton from './AddSectionButton';
import { isWhitespace } from '../../public/utils';
import { useDrag } from '../contexts/DragContext';

export default function TodoListsContainer() {
  const [, setDraggingId] = useDrag();
  const [todos, setTodos] = useState<TodoItem[]>(
    JSON.parse(localStorage.getItem('todos') || '[]')
  );
  const [sections, setSections] = useState<string[]>(
    JSON.parse(localStorage.getItem('sections') || '["default"]')
  );

  const addSection = (section: string) => {
    if (section.split('').some((char) => !isWhitespace(char))) {
      setSections((prevSections) => [...prevSections, section]);
    }
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('sections', JSON.stringify(sections));
  });

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setDraggingId('');
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragstart', handleDragOver);
    };
  }, [setDraggingId]);

  return (
    <div className="sections-container">
      {sections.map((section) => (
        <TodoList
          key={section}
          sectionTitle={section}
          todos={todos}
          setTodos={setTodos}
        />
      ))}

      <AddSectionButton addSection={addSection} />
    </div>
  );
}
