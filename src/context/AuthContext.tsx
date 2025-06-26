import { useEffect, useState, createContext, type ReactNode } from 'react';
import { auth } from '../services/firebase/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfouser: ({ uid, name, email }: UserProps) => void;
  user: UserProps | null;
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

  function handleInfouser({ uid, name, email }: UserProps) {
    setUser({
      uid,
      name,
      email,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        handleInfouser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
