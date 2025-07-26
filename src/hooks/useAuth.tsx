
import { createContext, useContext } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface AuthContextType {
  user: User | undefined;
  signUp: () => void;
  signIn: () => void;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loginWithRedirect, logout, isLoading } = useAuth0();

  const signUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  };

  const signIn = () => {
    loginWithRedirect();
  };

  const signOut = async () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      signUp,
      signIn,
      signOut,
      loading: isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
