import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();  // Access setIsAuthenticated from context

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false);  // Update authentication state
    navigate('/login');  // Redirect to the login page
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
