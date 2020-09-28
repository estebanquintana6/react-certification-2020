import React, { useState, useEffect, useContext, useCallback } from 'react';

import { AUTH_STORAGE_KEY, AUTH_USER } from '../../utils/constants';
import { storage } from '../../utils/storage';
import { loginApi } from '../../api/auth/login.api';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const lastUserState = storage.get(AUTH_USER);

    const isAuthenticated = Boolean(lastAuthState);

    setAuthenticated(isAuthenticated);
    setUser(lastUserState);
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await loginApi(username, password);
    if (res) {
      setUser(res);
      setAuthenticated(true);
      storage.set(AUTH_STORAGE_KEY, true);
      storage.set(AUTH_USER, res);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    setAuthenticated(false);
    storage.set(AUTH_STORAGE_KEY, false);
    storage.remove(AUTH_USER);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;
