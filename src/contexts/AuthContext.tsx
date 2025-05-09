import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  linkedin?: string;
  daysActive: number;
  projectProgress: {
    step1: 'pending' | 'submitted' | 'approved' | 'rejected';
    step2: 'pending' | 'submitted' | 'approved' | 'rejected';
    step3: 'pending' | 'submitted' | 'approved' | 'rejected';
  };
  certificateEnabled: boolean;
  paymentCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  updateProjectProgress: (step: keyof User['projectProgress'], status: User['projectProgress'][keyof User['projectProgress']]) => void;
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
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (email === 'admin@example.com' && password === 'password') {
          setUser({
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            daysActive: 30,
            projectProgress: {
              step1: 'approved',
              step2: 'approved',
              step3: 'approved'
            },
            certificateEnabled: true,
            paymentCompleted: true
          });
          resolve();
        } else if (email === 'user@example.com' && password === 'password') {
          setUser({
            id: '2',
            name: 'Test User',
            email: 'user@example.com',
            role: 'user',
            college: 'Test University',
            linkedin: 'linkedin.com/in/testuser',
            daysActive: 12,
            projectProgress: {
              step1: 'approved',
              step2: 'submitted',
              step3: 'pending'
            },
            certificateEnabled: false,
            paymentCompleted: false
          });
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock registration logic
        if (email === 'admin@example.com' || email === 'user@example.com') {
          reject(new Error('Email already in use'));
        } else {
          setUser({
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            role: 'user',
            daysActive: 0,
            projectProgress: {
              step1: 'pending',
              step2: 'pending',
              step3: 'pending'
            },
            certificateEnabled: false,
            paymentCompleted: false
          });
          resolve();
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const updateProjectProgress = (
    step: keyof User['projectProgress'], 
    status: User['projectProgress'][keyof User['projectProgress']]
  ) => {
    if (user) {
      setUser({
        ...user,
        projectProgress: {
          ...user.projectProgress,
          [step]: status
        }
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
        updateProjectProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};