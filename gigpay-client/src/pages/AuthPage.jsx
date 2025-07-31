// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Logo */}
      <img src="/logo.png" alt="GigPay Logo" className="h-16 mb-8" />

      {/* Toggle Buttons */}
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setMode('login')}
          className={`px-4 py-2 rounded-t-lg border-b-2 font-medium ${
            mode === 'login'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('register')}
          className={`px-4 py-2 rounded-t-lg border-b-2 font-medium ${
            mode === 'register'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Register
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-white p-6 rounded-b-lg shadow-lg">
        {mode === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
}
