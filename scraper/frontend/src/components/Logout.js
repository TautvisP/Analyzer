// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth from AuthContext

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Access the setIsAuthenticated function

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Update the authentication state
    setIsAuthenticated(false);
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
