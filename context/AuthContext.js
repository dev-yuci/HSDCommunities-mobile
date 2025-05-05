import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Auth context oluştur
const AuthContext = createContext();

// Auth provider bileşeni
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı oturum durumunu izle
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    // Cleanup fonksiyonu
    return unsubscribe;
  }, []);

  // Giriş fonksiyonu
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Kayıt fonksiyonu
  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // Çıkış fonksiyonu
  const logout = async () => {
    return await signOut(auth);
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
export const useAuth = () => useContext(AuthContext); 