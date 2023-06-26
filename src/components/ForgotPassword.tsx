import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);

  const { resetPassword } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current) {
      try {
        await resetPassword(emailRef.current.value);
        setMessage('Check your inbox for further instructions');
      } catch (error) {
        const e = error as firebase.FirebaseError;
        setErrorMessage(`${e.message}`.replace('Firebase: ', ''));
      }
    }
  };

  return (
    <>
      <div className="border p-5 w-fit rounded-md mx-auto mt-5 width">
        <h2 className="text-xl text-center font-semibold mb-3">
          Reset Password
        </h2>

        {errorMessage !== '' && (
          <div className="bg-red-200 rounded mx-auto p-1 text-center my-3 truncate hover:overflow-visible hover:whitespace-break-spaces">
            {errorMessage}
          </div>
        )}

        {message !== '' && (
          <div className="bg-green-200 rounded mx-auto p-1 text-center my-3 truncate hover:overflow-visible hover:whitespace-break-spaces">
            {message}
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

          <input
            className="rounded-md bg-blue-500 text-gray-50 mx-10 mt-5 p-1 hover:cursor-pointer hover:bg-blue-400"
            type="submit"
            value="Submit"
          />
        </form>
        <div className="text-center text-xs mt-1">
          <Link className="text-blue-500" to="/login">
            Log In
          </Link>
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
