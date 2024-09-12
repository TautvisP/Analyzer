import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

// Register component for user registration
const Register = () => {
  // State variables for form fields and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to programmatically navigate to other routes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa'); // Set error message if passwords don't match
      return;
    }

    // Send a POST request to the registration endpoint
    axios.post('http://127.0.0.1:8000/api/register/', {
      username,
      password
    })
    .then(response => {
      console.log("Vartotojas priregistruotas sėkmingai"); // Log success message
      navigate('/login'); // Redirect to login page on successful registration
    })
    .catch(error => {
      setError('Error registering user'); // Set error message on failure
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
        <div className="form-group">
          <label>Pakartokite Slaptažodį:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on change
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
        <button type="submit">Registruotis</button> {/* Submit button */}
        <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p> {/* Link to login page */}
      </form>
    </div>
  );
};

export default Register;
