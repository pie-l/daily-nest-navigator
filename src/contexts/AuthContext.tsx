
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Simulate API call - in real app, this would be actual authentication
    if (password === 'password123') {
      const userData: User = {
        id: '1',
        name: getRoleDisplayName(role),
        email,
        role,
        avatar: getRoleAvatar(role)
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const getRoleDisplayName = (role: string): string => {
    const roleMap: Record<string, string> = {
      admin: 'Admin User',
      parent: 'Sarah Johnson',
      cook: 'Chef Mike',
      driver: 'Driver Emma',
      child: 'Little Emma'
    };
    return roleMap[role] || role;
  };

  const getRoleAvatar = (role: string): string => {
    const avatarMap: Record<string, string> = {
      admin: '👑',
      parent: '👩‍💼',
      cook: '👨‍🍳',
      driver: '🚗',
      child: '👧'
    };
    return avatarMap[role] || '👤';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
