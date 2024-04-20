import { Link, Outlet } from "react-router-dom";
import NavBeforeLogin from "./NavBeforeLogin";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import UserContext from "./UserContext";
import { useContext } from "react";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(''); // Reset error message

    if (!username) {
      setErrorMsg('Username is required');
      return;
    }
    if (!password) {
      setErrorMsg('Password is required');
      return;
    }


    try {
      const response = await axios.post('/api/users/register', {
        username: username,
        password: password
      });
      console.log(response);

      const data = response.data;

      // Check if the status code is 2xx
      if (response.status >= 200 && response.status < 300) {
        navigate('/passwordsmanager');
      } else {
        setErrorMsg(data.message || 'An error occurred during login');
      }
    } catch (error) {

      if (error.response) {
        setErrorMsg(error.response.data || 'Sign up failed');
      } else if (error.request) {
        setErrorMsg('No response from the server');
      } else {
        setErrorMsg('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <NavBeforeLogin />
      
      <div className="container">
      <div className="text-xl font-semibold text-gray-800 mb-5">Sign Up</div>
        <form onSubmit={handleSubmit} className="form">
          {errorMsg && <div className="error">{errorMsg}</div>}
          <div className="inputGroup">
            <label className="label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="button">Sign up</button>
        </form>
      </div>
    </div>
  );
}