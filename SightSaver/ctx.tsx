import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren<{}>) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem('session');
        setSession(savedSession);
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (username: string, password: string) => {
    // Perform sign-in logic here, for example, validate username and password
    // Simulating sign-in with a delay of 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // If sign-in is successful, set the session
    setSession('dummy_session_token');
  };

  const signOut = () => {
    setSession(null);
  };

  useEffect(() => {
    const saveSession = async () => {
      try {
        if (session === null) {
          await AsyncStorage.removeItem('session');
        } else {
          await AsyncStorage.setItem('session', session);
        }
      } catch (error) {
        console.error('Error saving session:', error);
      }
    };

    saveSession();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
