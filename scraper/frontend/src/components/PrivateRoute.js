import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Make sure to import AuthContext

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
