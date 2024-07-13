import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './styles/SignUp.css'; // Ensure this path is correct

/**
 * SignUp component for user registration.
 * Provides functionality for registering new users by interacting with the backend API.
 * 
 * @returns {JSX.Element} The rendered SignUp page component.
 */
const SignUp = () => {
  const [username, setUsername] = useState(''); // State to manage the username input field
  const [email, setEmail] = useState(''); // State to manage the email input field
  const [password, setPassword] = useState(''); // State to manage the password input field
  const [error, setError] = useState(''); // State to manage registration errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handle sign-up form submission.
   * @param {React.FormEvent<HTMLFormElement>} event - Event object for form submission.
   */
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Make a POST request to the backend API for registration
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      // Check if the registration was successful
      if (response.status === 201) {
        console.log('Sign-up successful!');
        navigate('/login'); // Redirect to the Login page
      }
    } catch (err) {
      // Enhanced error handling
      if (err.response) {
        // Backend returned an error response
        if (err.response.data && err.response.data.error) {
          setError(err.response.data.error); // Display error message from the backend
        } else {
          setError('An unexpected error occurred.'); // Display generic error message
        }
      } else {
        // Network or other errors
        setError('Unable to connect to the server.'); // Display network error message
      }
    }
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to the Login page
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the Welcome page
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
