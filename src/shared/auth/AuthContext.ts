import { createContext } from 'react';

interface UserIdentity {
  id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

interface AuthContextType {
  user: UserIdentity;
  updateUser: (updates: Partial<UserIdentity>) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export type { UserIdentity, AuthContextType };
