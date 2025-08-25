import { createContext, useContext, useState } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });
  const [loading, setLoading] = useState(false);

  // HARDCODED ADMIN CREDENTIALS - Change these values as needed
  const ADMIN_USERNAME = 'namo'; // Change this username here
  const ADMIN_PASSWORD = 'indianamkeen'; // Change this password here

  const login = (username: string, password: string): boolean => {
    setLoading(true);
    
    // Check hardcoded credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('admin_logged_in', 'true');
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_logged_in');
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdmin,
      loading,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};