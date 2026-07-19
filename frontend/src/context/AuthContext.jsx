import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { adminLogin, adminMe, adminLogout } from '../lib/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = unauthenticated, object = authed
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    adminMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(false))
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await adminLogin(email, password);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch (e) {
      // ignore network errors on logout
    }
    setUser(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
