import React, { useState } from 'react';
import './FormStyles.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const response = await axios.post("https://chat-backend-1-9z10.onrender.com/api/login", { email, password });
      
      // On success
      if (response.data.data) {
        // Save user data to localStorage (be mindful of sensitive data)
        localStorage.setItem("user-chat", JSON.stringify(response.data.data));
        toast.success(response.data.msg);
        
        // Redirect to the chat page
        navigate('/chat');
        
        // Reset form fields
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      // Handle error
      toast.error(error.response ? error.response.data.msg : "Something went wrong");
    } finally {
      setLoading(false); // Stop loading state after the request
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
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
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p style={{marginBottom:"8px",color:"#018F96",textDecoration:"underline"}} onClick={()=>{navigate("/register")}}>create an account</p>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
