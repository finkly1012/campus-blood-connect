/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useCallback, useContext, type ReactNode } from 'react';

// Define the user type based on users.json
export interface User {
  id: number;
  name: string;
  email: string;
  bloodType: string;
  role: 'user' | 'admin';
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with a default value of null, but typed.
export const UserContext = createContext<UserContextType | null>(null);

// Custom hook for consuming the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    console.log('UserProvider: Initializing user from localStorage:', storedUser); // Debug log
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
