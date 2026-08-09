import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Relative path — works in dev (via Vite proxy) and production
const API = '/api';
const TOKEN_KEY = 'portfolio_admin_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin]   = useState(false);
  const [loading, setLoading]   = useState(true);  // verifying on mount
  const [username, setUsername] = useState('');

  /* ── Verify stored token on page load ── */
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }

    fetch(`${API}/auth/verify`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          setIsAdmin(true);
          setUsername(data.username);
        } else {
          sessionStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => sessionStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  /* ── Login ── */
  const login = useCallback(async (user, pass) => {
    const res  = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    sessionStorage.setItem(TOKEN_KEY, data.token);
    setIsAdmin(true);
    setUsername(data.username);
    return data;
  }, []);

  /* ── Logout ── */
  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setIsAdmin(false);
    setUsername('');
  }, []);

  /* ── Authenticated fetch helper ── */
  const authFetch = useCallback((url, options = {}) => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, loading, username, login, logout, authFetch, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
