import React, { useState, createContext, useContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Retrieve token from cookies and user from localStorage
  const storedToken = Cookies.get('jwt');
  const storedUser = localStorage.getItem('Litefit-Users');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [authToken, setAuthToken] = useState(storedToken);
  const [authUser, setAuthUser] = useState(initialUser);

  const updateAuthUser = (newAuthUser) => {
    if (newAuthUser && newAuthUser.token) {
      // Save token in cookies and user details in localStorage
      Cookies.set('jwt', newAuthUser.token);
      localStorage.setItem('Litefit-Users', JSON.stringify(newAuthUser));
      setAuthToken(newAuthUser.token);
      setAuthUser(newAuthUser);
    } else {
      // Clear token from cookies and user details from localStorage
      Cookies.remove('jwt');
      localStorage.removeItem('Litefit-Users');
      setAuthToken(null);
      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, authUser, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
} 

export const useAuth = () => useContext(AuthContext);
