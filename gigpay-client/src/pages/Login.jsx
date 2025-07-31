import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log("Attempting login with:", {
      email: creds.email,
      password: creds.password ? `[${creds.password.length} chars]` : 'empty'
    });

    try {
      // Send trimmed credentials
      const loginData = {
        email: creds.email.trim().toLowerCase(),
        password: creds.password
      };

      const { data } = await api.post('/auth/login', loginData);
      console.log("Login response:", data);

      // Handle different response formats
      let userData;
      
      if (data.user) {
        // New controller format: { success, token, user }
        userData = data;
      } else if (data.token) {
        // Old router format: { token } - need to get user separately
        console.log("Old format detected, fetching user data...");
        
        // Store token temporarily to make authenticated request
        localStorage.setItem('token', data.token);
        
        try {
          const userResponse = await api.get('/auth/me');
          userData = {
            token: data.token,
            user: userResponse.data
          };
        } catch (userErr) {
          console.error("Failed to fetch user data:", userErr);
          // Fallback: create minimal user object
          userData = {
            token: data.token,
            user: {
              email: loginData.email,
              role: 'GigWorker' // Default role, will need to be updated
            }
          };
        }
      } else {
        throw new Error("Invalid response format");
      }

      login(userData); // Store user in context

      // Navigate to correct dashboard based on role
      if (userData.user?.role === 'GigWorker') {
        navigate('/dashboard/gigworker');
      } else if (userData.user?.role === 'Employer') {
        navigate('/dashboard/employer');
      } else {
        // Fallback for unknown roles
        console.warn("Unknown role:", userData.user?.role);
        navigate('/profile'); // or wherever you want to redirect
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      
      // Handle different error response formats
      let errorMessage = 'Login failed';
      
      if (err.response?.data?.msg) {
        errorMessage = err.response.data.msg;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid credentials';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        errorMessage = 'Cannot connect to server. Please check if the server is running.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={creds.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}