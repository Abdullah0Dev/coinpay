import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
