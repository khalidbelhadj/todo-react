import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserConfig } from '../contexts/UserConfigContext';

export default function Header() {
  const [date, setDate] = useState(new Date());
  const { currentUser, logout } = useAuth();
  const { showCompleted, toggleShowCompleted } = useUserConfig();

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

      <div>{currentUser?.email}</div>

      <button
        className={
          'mr-2 rounded border px-1 ' + (showCompleted && 'bg-gray-100')
        }
        onClick={handleLogout}
      >
        Log Out
      </button>

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
