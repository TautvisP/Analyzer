import React, { createContext, useState, useEffect, useContext } from 'react';

// Create an AuthContext to hold authentication state and functionality
const AuthContext = createContext();

// Create a provider component to manage and provide authentication state
export const AuthProvider = ({ children }) => {
  // Initialize authentication state based on presence of token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Update authentication state when component mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    // Provide authentication state and setter function to the rest of the app
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context in functional components
export const useAuth = () => useContext(AuthContext);
