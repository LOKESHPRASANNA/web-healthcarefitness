import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem('gym_user');
    const storedToken = localStorage.getItem('gym_token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('gym_user', JSON.stringify(userData));
    if (jwtToken) {
        localStorage.setItem('gym_token', jwtToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gym_user');
    localStorage.removeItem('gym_token');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('gym_user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
