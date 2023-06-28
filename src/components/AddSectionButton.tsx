import { useEffect, useRef, useState } from 'react';
import { useData } from '../contexts/DataContext';

export default function AddSectionButton() {
  const [prompting, setPrompting] = useState(false);
  const promptRef = useRef<HTMLInputElement>(null);
  const [, dispatch] = useData();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      dispatch({
        type: 'ADD_SECTION',
        section: target.value,
      })
      setPrompting(false);
      target.value = '';
    }
    if (event.key === 'Escape') {
      setPrompting(false);
    }
  };

  useEffect(() => {
    if (prompting) {
      promptRef.current?.focus();
    }
  }, [prompting]);

  return (
    <>
      {!prompting && (
        <div className="h-10 w-80 inline-block bg-gray-100 rounded-md flex-shrink-0">
          <button onClick={() => setPrompting(true)} className="w-full h-full">
            Add Section
          </button>
        </div>
      )}

      {prompting && (
        <input
          className="h-10 bg-gray-100 rounded-md w-80 flex-shrink-0 todo-input p-2"
          type="text"
          name="prompt"
          onKeyDown={handleKeyDown}
          onBlur={() => setPrompting(false)}
          ref={promptRef}
        />
      )}
    </>
  );
}
