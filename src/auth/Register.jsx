import React, { useState } from 'react';
import './FormStyles.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Async function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("https://chat-backend-1-9z10.onrender.com/api/register", { email, username, password });

      // If registration is successful, show a success message and reset the form
      toast.success(response.data.msg);
      setEmail('');
      setUsername('');
      setPassword('');
      
      // Redirect user to the login page after successful registration
      navigate('/');

    } catch (error) {
      // If registration fails, display an error message
      if (error.response) {
        toast.error(error.response.data.error || 'Registration failed. Please try again.');
      } else {
        toast.error('Network error. Please try again later.');
      }
      console.error('Error during registration:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p style={{marginBottom:"8px",color:"#018F96",textDecoration:"underline"}} onClick={()=>{navigate("/")}}>Already have an account</p>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
