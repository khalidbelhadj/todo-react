import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
      <div className="border p-5 w-fit rounded-md mx-auto mt-5 width">
        <h2 className="text-xl text-center font-semibold mb-3">Login</h2>

        {errorMessage !== '' && (
          <div className="bg-red-200 rounded mx-auto p-1 text-center my-3 truncate hover:overflow-visible hover:whitespace-break-spaces">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col flex gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="outline-none outline-gray-200 rounded-sm"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="outline-none outline-gray-200 rounded-sm"
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />

          <input
            className="rounded-md bg-blue-500 text-gray-50 mx-10 mt-5 p-1 hover:cursor-pointer hover:bg-blue-400"
            type="submit"
            value="Submit"
          />
        </form>
        <div className="text-center text-xs mt-2 text-blue-500">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      <div className="text-center text-xs mt-1">
        Don't have an account?{' '}
        <Link className="text-blue-500" to="/signup">
          Sign up
        </Link>
        .
      </div>
    </>
  );
}
