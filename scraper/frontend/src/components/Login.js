import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useAuth } from './AuthContext'; // Import useAuth

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialize navigate
  const { setIsAuthenticated } = useAuth();  // Access setIsAuthenticated from context

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);  // Save the token to localStorage
        setIsAuthenticated(true);  // Update authentication state
        navigate('/tenders');  // Redirect to the tenders list
      })
      .catch(() => {
        setError('Invalid credentials');
      });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
