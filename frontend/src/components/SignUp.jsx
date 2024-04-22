import NavBeforeLogin from "./NavBeforeLogin";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import LoginSignupBox from "./LoginSignupBox";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');

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

      <LoginSignupBox title='Sign Up' username={username} setUsername={setUsername} password={password} setPassword={setPassword} errorMsg={errorMsg} handleSubmit={handleSubmit}/>
    </div>
  );
}