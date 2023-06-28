import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
      <div className="form-container">
        <h2 className="form-header">
          Reset Password
        </h2>

        {errorMessage !== '' && (
          <div className="form-error-message">
            {errorMessage}
          </div>
        )}

        {message !== '' && (
          <div className="form-success-message">
            {message}
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

          <input
            className="submit-button"
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
