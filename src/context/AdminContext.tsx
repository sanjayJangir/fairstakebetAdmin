import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { isAuthenticated, clearAuth } from '../utils/auth';

// Types
interface Admin {
  id?: string;
  email?: string;
  role?: string;
}

interface AdminState {
  isAuthenticated: boolean;
  admin: Admin | null;
  isLoading: boolean;
}

interface AdminContextType extends AdminState {
  dispatch: React.Dispatch<AdminAction>;
}

type AdminAction =
  | { type: 'SET_ADMIN'; payload: Admin }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AdminState = {
  isAuthenticated: false,
  admin: null,
  isLoading: true,
};

// Create context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Reducer
const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isAuthenticated()) {
          // You might want to validate the token here with a backend call
          const adminData = {
            email: 'admin@fairstakebet.com',
            role: 'admin'
          };
          dispatch({ type: 'SET_ADMIN', payload: adminData });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuth();
        dispatch({ type: 'LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
