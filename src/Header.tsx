import { useEffect, useState } from 'react';

export type Props = {
  showCompleted: boolean;
  toggleShowCompleted: () => void;
};

export default function Header({ showCompleted, toggleShowCompleted }: Props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <div className="flex px-3 py-1 border shadow-sm overflow-x-auto">
      <div className="font-bold flex-grow text-lg">TODO</div>

      <button
        className={
          'mr-2 rounded border px-1 ' + (showCompleted && 'bg-gray-100')
        }
        onClick={toggleShowCompleted}
      >
        Show Completed
      </button>

      <div className="todays-date italic font-extralight text-lg">
        {date.toDateString()}
      </div>
    </div>
  );
}
