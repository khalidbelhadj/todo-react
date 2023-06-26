import { createContext, useContext, useState } from 'react';

export type UserConfigContextType = {
  showCompleted: boolean;
  toggleShowCompleted: () => void;
};

const UserConfigContext = createContext<UserConfigContextType>({
  showCompleted: false,
  toggleShowCompleted: () => {
    console.error("UserConfigContext does not have a provider.")
    return;
  },
});

export function useUserConfig() {
  return useContext(UserConfigContext);
}

export type Props = {
  children: React.ReactNode;
};

export function UserConfigProvider({ children }: Props) {
  const [showCompleted, setShowCompleted] = useState<boolean>(
    JSON.parse(localStorage.getItem('showCompleted') || 'false')
  );

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const value: UserConfigContextType = {
    showCompleted,
    toggleShowCompleted,
  };

  return (
    <UserConfigContext.Provider value={value}>
      {children}
    </UserConfigContext.Provider>
  );
}
