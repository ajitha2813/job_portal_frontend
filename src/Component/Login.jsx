import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(""); // For showing error messages
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      // Send the login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
  
      // Log the response data from backend
      console.log('Login successful', response.data);
  
      // If successful, redirect to dashboard
      navigate('/findjob');
    } catch (error) {
      // Log the error response from backend
      if (error.response) {
        console.error('Login failed: ', error.response.data);  // Log the error response from backend
        setError(error.response.data.message || "Invalid email or password"); // Show error message from backend
      } else {
        console.error('Login failed: ', error.message);  // If there's no response, log the error message
        setError("Something went wrong, please try again."); // General error message
      }
    }
  };
  

  return (
    <div>
      <div className="login-container">
        <h3>Skill Hire</h3>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>} {/* Display error */}
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
