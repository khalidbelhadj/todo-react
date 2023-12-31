import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import firebase from 'firebase/compat/app';
import { initialData } from '../../utils';

export type AuthContextType = {
  currentUser: firebase.User | null;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: () => Promise.resolve({} as firebase.auth.UserCredential),
  login: () => Promise.resolve({} as firebase.auth.UserCredential),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
});

export type Props = {
  children: React.ReactNode;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    const credential = await auth.createUserWithEmailAndPassword(email, password);
    database.users.doc(credential.user?.uid).set({
      ...initialData,
      firstName,
      lastName,
    });
    return credential;
  };

  const login = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return auth.signOut();
  };

  const resetPassword = async (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
