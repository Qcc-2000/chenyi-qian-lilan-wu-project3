import { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserContext from "./UserContext";
import NavAfterLogin from "./NavAfterLogin";
import axios from "axios";
import { useState } from "react";
import AddUpdateBox from "./AddUpdateBox";
import OwnPasswordListBox from "./OwnPasswordListBox";
import SharePasswordListBox from "./SharePasswordListBox";
import ShareRequestBox from "./ShareRequestBox";
import Message from "./Message";
import { useNavigate } from 'react-router';

export default function PasswordsManager() {
  const [passwordListState, setPasswordListState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const [urlState, setUrlState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const [useAlphabet, setUseAlphabet] = useState(false);
  const [useNumerals, setUseNumerals] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [length, setLength] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const  navigate = useNavigate();


  const [editingState, setEditingState] = useState({
    isEditing: false,
    editingPasswordId: '',
  });



  async function getPasswordListInitial(username) {
    console.log(username);
    const response = await axios.get('/api/passwords/' + username);
    setPasswordListState(response.data);
  }

  async function getPasswordList() {
    console.log(loginUsername);
    const response = await axios.get('/api/passwords/' + loginUsername);
    setPasswordListState(response.data);
  }


  async function deletePassword(passwordId) {
    await axios.delete('/api/passwords/' + passwordId);
    getPasswordList();
  }

  // functions for add/update password
  const generatePassword = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numerals = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let characters = '';
    let generatedPassword = '';

    if (useAlphabet) characters += alphabet;
    if (useNumerals) characters += numerals;
    if (useSymbols) characters += symbols;

    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return generatedPassword;
  };

  async function handleSubmit() {
    setErrorState('')
    if (!urlState) {
      setErrorState('The url can not be empty.');
      return
    }

    let finalPassword = passwordState;

    if (!passwordState) {
      if (!useAlphabet && !useNumerals && !useSymbols) {
        setErrorState('At least one checkbox must be checked to generate a password.');
        return;
      }
      if (length == null || length < 4 || length > 50) {
        setErrorState('Length must be between 4 and 50.');
        return;
      }
      finalPassword = generatePassword();
    }
    console.log(finalPassword);


    try {
      if(editingState.isEditing) {
        console.log(urlState);
        console.log(finalPassword);

        await axios.put('/api/passwords/' + editingState.editingPasswordId, {
          url: urlState,
          password: finalPassword,
          _id: editingState.editingPasswordId
        });

      } else {
        await axios.post('/api/passwords', {
          url: urlState,
          password: finalPassword,
          owner: loginUsername
        })
      }
      setUrlState('');
      setPasswordState('');
      setUseAlphabet(false);
      setUseNumerals(false);
      setUseSymbols(false);
      setLength('');
      setEditingState({
        isEditing: false, 
        editingPasswordId: '',
      });
      setErrorState('');
      await getPasswordList();

    } catch (error) {
      if (error.response) {
        setErrorState(error.response.data || 'Add or update password failed');
      } else if (error.request) {
        setErrorState('No response from the server');
      } else {
        setErrorState('Error: ' + error.message);
      }
    }
  }

  function setEditingPassword(url, password, passwordId) {
    setUrlState(url);
    setPasswordState(password);
    setEditingState({
      isEditing: true, 
      editingPasswordId: passwordId
  });
    setErrorState('');
  }

  function handleCancel() {
    setUrlState('');
    setPasswordState('');
    setEditingState({
      isEditing: false, 
      editingPasswordId: '',
  });
    setErrorState('');
  }

  async function isLoggedIn() {
    try {
      const response = await axios.get('/api/users/isLoggedIn');
      console.log(response.data.username);
      setLoginUsername(response.data.username);
      return response.data.username;
    } catch (e) {
      navigate('/')
    }
  }

  function onStart() {
    isLoggedIn()
      .then((username) => {
        getPasswordListInitial(username)
      })
    
  }

  useEffect(onStart, []);


  if(!loginUsername) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center flex-col">
      <NavAfterLogin username={loginUsername}/>
      <div className="mx-20">
        <Message receiver={loginUsername} getPasswordList={getPasswordList}/>
        <OwnPasswordListBox owner={loginUsername} passwordListState={passwordListState} deletePassword={deletePassword} setEditingPassword={setEditingPassword} />
        <SharePasswordListBox owner={loginUsername} passwordListState={passwordListState} />
        <AddUpdateBox editingState={editingState} errorState={errorState} urlState={urlState} setUrlState={setUrlState} passwordState={passwordState} setPasswordState={setPasswordState} useAlphabet={useAlphabet} useNumerals={useNumerals} useSymbols={useSymbols} setUseAlphabet={setUseAlphabet} setUseNumerals={setUseNumerals} setUseSymbols={setUseSymbols} length={length} setLength={setLength} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        <ShareRequestBox sender={loginUsername} />

      </div>
      
    </div>
  )
}