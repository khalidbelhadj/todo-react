import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}
