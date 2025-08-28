import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
// 
const mockUsers: { [key: string]: { password: string; user: User } } = {
  admin: {
    password: 'admin123',
    user: { id: '1', username: 'admin', role: 'admin' }
  },
  user: {
    password: 'user123',
    user: { id: '2', username: 'user', role: 'user' }
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const userAccount = mockUsers[username];
    
    if (userAccount && userAccount.password === password) {
      // Mock JWT token (in real app, this would come from backend)
      const mockToken = btoa(JSON.stringify({ 
        userId: userAccount.user.id, 
        role: userAccount.user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }));
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(userAccount.user));
      setUser(userAccount.user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
