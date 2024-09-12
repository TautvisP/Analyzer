import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login/', {
      username,
      password
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/tenders');
    })
    .catch(error => {
      setError('Invalid credentials');
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
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Slaptažodis:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Prisijungti</button>
        <p>Neturite paskyros? <Link to="/register">Registruotis</Link></p>
      </form>
    </div>
  );
};

export default Login;
