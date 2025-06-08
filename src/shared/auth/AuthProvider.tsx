import { useState, type ReactNode } from 'react';
import {
  AuthContext,
  type UserIdentity,
  type AuthContextType,
} from './AuthContext';

// Default/mock user for development
const DEFAULT_USER: UserIdentity = {
  id: '1',
  fullName: 'David H',
  //   email: 'david@ondergrond.link',
  preferences: {
    theme: 'light',
    notifications: true,
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserIdentity>(DEFAULT_USER);

  const updateUser = (updates: Partial<UserIdentity>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates,
      preferences: {
        ...prevUser.preferences,
        ...updates.preferences,
      },
    }));
  };

  // Stub methods for future auth implementation
  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    console.log('Login attempted:', email, password);
    throw new Error('Authentication not implemented yet');
  };

  const logout = () => {
    // TODO: Implement actual logout logic
    console.log('Logout attempted');
    // For now, reset to default user
    setUser(DEFAULT_USER);
  };

  const value: AuthContextType = {
    user,
    updateUser,
    login,
    logout,
    isAuthenticated: true, // Always true for mock implementation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
