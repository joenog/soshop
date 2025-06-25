import { useEffect, useState, createContext, type ReactNode } from 'react';
import { auth } from '../services/firebase/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
};

interface UserProps {
  uid: string;
  name: string;
  email: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        //have user
        setUser({
          uid: user.uid,
          name: user?.displayName ?? '',
          email: user?.email ?? '',
        });
        setLoadingAuth(false);
      } else {
        //have not user
        setUser(null);
      }
      setLoadingAuth(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
