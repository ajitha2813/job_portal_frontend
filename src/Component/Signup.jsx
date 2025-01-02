import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    // Simple password match check
    if (!username) {
      setError("Username is required.");
      return;
    }

    if (!email) {
      setError("E-mail is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!confirmPassword) {
      setError("Confirm password is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous errors
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        username,
        email,
        password,
      });

      console.log("User created:", response.data);
      // On success, redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      setIsLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error creating user.");
      } else {
        setError("Server error.");
      }
    }
  };

  return (
    <div>
      <div className="login-container">
        <h3>Skill Hire</h3>
        <h1>Signup</h1>
        {error && <p className="error">{error}</p>} {/* Display error */}
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
