import { useEffect, useRef, useState } from 'react';

export type Props = {
  addTodo: (content: string) => void;
};

export default function AddTodoButton({ addTodo }: Props) {
  const [prompting, setPrompting] = useState(false);
  const promptRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      addTodo(target.value);
      target.value = '';
    }
    if (event.key === 'Escape') {
      setPrompting(false);
    }
  };

  useEffect(() => {
    if (prompting) {
      const current = promptRef.current;
      if (current) {
        current.focus();
      }
    }
  }, [prompting]);

  return (
    <>
      {prompting && (
        <input
          className="todo-input"
          type="text"
          name="prompt"
          onKeyDown={handleKeyDown}
          onBlur={() => setPrompting(false)}
          ref={promptRef}
        />
      )}

      {!prompting && (
        <button className="add-button" onClick={() => setPrompting(true)}>
          +
        </button>
      )}
    </>
  );
}
