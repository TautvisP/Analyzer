import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/register/', {
      username,
      password
    })
    .then(response => {
      console.log("Vartotojas priregistruotas sėkmingai");
      navigate('/login');
    })
    .catch(error => {
      setError('Error registering user');
    });
  };

  return (
    <div className="form-container">
      <h1>Registruotis</h1>
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
        <div className="form-group">
          <label>Pakartokite Slaptažodį:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registruotis</button>
        <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p>
      </form>
    </div>
  );
};

export default Register;
