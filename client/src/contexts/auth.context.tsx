import { createContext, useState, FC } from 'react';

interface AuthContext {
  accessToken?: string;
  roles?: string[];
  username?: string;
}

interface DefaultContext {
  auth?: AuthContext;
  setAuth: React.Dispatch<React.SetStateAction<AuthContext>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProvider {
  children: React.ReactNode;
}

const defaultContext: DefaultContext = {
  setAuth: () => null,
  persist: false,
  setPersist: () => null,
};

export const AuthContext = createContext<DefaultContext>(defaultContext);

export const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState({});

  const hasPersist: boolean = Boolean(localStorage.getItem('persist')) || false;

  const [persist, setPersist] = useState<boolean>(hasPersist);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
