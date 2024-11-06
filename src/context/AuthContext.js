// src/context/AuthContext.js
import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 const[email,setEmail]=useState('');
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (newToken,email) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setEmail(email);
    setIsAuthenticated(true)
    // Optionally decode token to get user info
    setUser({ id: 'user-id-from-token' }); // Simplified
    console.log('user',)
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setEmail(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,isAuthenticated ,email}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);