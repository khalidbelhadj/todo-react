import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import PrivateRoute from './authentication/PrivateRoute';
import Dashboard from './Dashboard';
import { DataProvider } from '../contexts/DataContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                  <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
