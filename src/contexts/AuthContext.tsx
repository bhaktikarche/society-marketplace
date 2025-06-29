import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { User, AuthContextType } from '../utils/types';
import LocalStorageService from '../utils/localStorage';

// Create the context with strict typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current user on component mount
  useEffect(() => {
    try {
      const savedUser = LocalStorageService.getCurrentUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logs in a user based on email.
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

      const users = LocalStorageService.getUsers();
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        setUser(existingUser);
        LocalStorageService.saveUser(existingUser);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registers a new user if the email is not already in use.
   */
  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

      const users = LocalStorageService.getUsers();
      const emailExists = users.some(u => u.email === email);

      if (emailExists) {
        return false; // Duplicate email
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      LocalStorageService.saveUsers(users);
      LocalStorageService.saveUser(newUser);
      setUser(newUser);

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logs out the current user and clears local storage.
   */
  const logout = (): void => {
    setUser(null);
    LocalStorageService.removeCurrentUser();
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
