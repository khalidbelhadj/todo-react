import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      return setErrorMessage('Passwords do not match');
    }
    if (lastNameRef.current && firstNameRef.current && emailRef.current && passwordRef.current) {
      try {
        await signup(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, passwordRef.current.value);
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
        <h2 className="form-header">Sign Up</h2>

        {errorMessage !== '' && (
          <div className="form-error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col flex gap-2">

          <label htmlFor="first-name">First Name:</label>
          <input
            className="form-input"
            type="text"
            id="first-name"
            name="first-name"
            ref={firstNameRef}
            required
          />

          <label htmlFor="last-name">Last Name:</label>
          <input
            className="form-input"
            type="text"
            id="last-name"
            name="last-name"
            ref={lastNameRef}
            required
          />

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

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={confirmPasswordRef}
            required
          />
          <input
            className="submit-button"
            type="submit"
            value="Submit"
          />
        </form>
      </div>

      <p className="text-center text-xs mt-1">
        Already have an account?{' '}
        <Link className="text-blue-500" to="/login">
          Log In
        </Link>
        .
      </p>
    </>
  );
}
