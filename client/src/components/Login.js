import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      window.location.href = '/welcome'; // Redirect to welcome page
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="4" /* Set minimum length here */
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <button type="button" onClick={switchToSignup}>Sign Up</button></p>
      </form>
    </div>
  );
};

export default Login;
