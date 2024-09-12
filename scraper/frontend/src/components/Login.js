import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Login component for user login
const Login = () => {
  // State variables for form fields and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Hook to programmatically navigate to other routes
  const { setIsAuthenticated } = useAuth();  // Access setIsAuthenticated from AuthContext to update authentication state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send a POST request to the login endpoint
    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(response => {
        const token = response.data.token; // Extract token from response
        localStorage.setItem('token', token);  // Save the token to localStorage
        setIsAuthenticated(true);  // Update authentication state in context
        navigate('/tenders');  // Redirect to the tenders list page upon successful login
      })
      .catch(() => {
        setError('Invalid credentials'); // Set error message if authentication fails
      });
  };

  return (
    <div className="form-container">
      <h1>Prisijungti</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vartotojo Vardas:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
            required
          />
        </div>
        <div className="form-group">
          <label>Slaptažodis:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
        <button type="submit">Prisijungti</button> {/* Submit button */}
        <p>Neturite paskyros? <Link to="/register">Registruotis</Link></p> {/* Link to registration page */}
      </form>
    </div>
  );
};

export default Login;
