import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { auth } from '../firebase/config';
import firebase from 'firebase/compat/app';

// Auth context tipi tanımlama
interface AuthContextType {
  user: firebase.User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

// AuthProvider props tipi
interface AuthProviderProps {
  children: ReactNode;
}

// Auth context oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider bileşeni
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı oturum durumunu izle
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    
    // Cleanup fonksiyonu
    return unsubscribe;
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  // Kayıt fonksiyonu
  const register = async (email: string, password: string) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };

  // Çıkış fonksiyonu
  const logout = async () => {
    return await auth.signOut();
  };

  // Context değerlerini sağla
  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 