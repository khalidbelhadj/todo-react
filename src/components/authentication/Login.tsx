import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        navigate('/');
      } catch (error) {
        const e = error as firebase.FirebaseError;
        setErrorMessage(`${e.message}`.replace('Firebase: ', ''));
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-header">Login</h2>

        {errorMessage !== '' && (
          <div className="form-error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col flex gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />

          <input
            className="submit-button"
            type="submit"
            value="Submit"
          />
        </form>

        <p className="text-center text-xs mt-2 text-blue-500">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>

      </div>
      <p className="text-center text-xs mt-1">
        Don't have an account?{' '}
        <Link className="text-blue-500" to="/signup">
          Sign up
        </Link>
        .
      </p>
    </>
  );
}
