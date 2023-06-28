import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function Header() {
  const [date, setDate] = useState(new Date());
  const [state, dispatch] = useData();
  const { logout } = useAuth();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await logout();
  };

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <div className="flex px-3 py-1 border shadow-sm overflow-x-auto">
      <div className="font-bold flex-grow text-lg">TODO</div>

      <div>{state?.firstName}</div>

      <button
        className={
          'mr-2 rounded border px-1 ' + (state?.config.showCompleted && 'bg-gray-100')
        }
        onClick={handleLogout}
      >
        Log Out
      </button>

      <button
        className={
          'mr-2 rounded border px-1 ' + (state?.config.showCompleted && 'bg-gray-100')
        }
        onClick={() => dispatch({
          type: 'TOGGLE_SHOW_COMPLETED'
        })}
      >
        Show Completed
      </button>

      <div className="todays-date italic font-extralight text-lg">
        {date.toDateString()}
      </div>
    </div>
  );
}
