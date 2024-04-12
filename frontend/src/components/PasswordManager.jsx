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

export default function PasswordsManager() {
  const { loginState, setLoginState } = useContext(UserContext);
  const [passwordListState, setPasswordListState] = useState([]);

  const [errorState, setErrorState] = useState('');
  const [urlState, setUrlState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const [useAlphabet, setUseAlphabet] = useState(false);
  const [useNumerals, setUseNumerals] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [length, setLength] = useState('');

  const [editingState, setEditingState] = useState({
    isEditing: false,
    editingPasswordId: '',
  });

//   let passwordListStateTest = [{_id: '1', url: 'http:1', password: 'pw1', owner: 'lilan'}, 
//   {_id: '2', url: 'http:2', password: 'pw2', owner: 'lilan'}, 
//   {_id: '3', url: 'http:3', password: 'pw3', owner: 'zz'},
//   {_id: '4', url: 'http:4', password: 'pw4', owner: 'qcy'},
// ];



  async function getPasswordList() {
    const response = await axios.get('/api/passwords/' + loginState.loginUsername);
    setPasswordListState(response.data);
    // console.log(passwordListState);
    // setPasswordListState(passwordListStateTest);

  }



  async function deletePassword(passwordId) {
    await axios.delete('/api/passwords/' + passwordId);
    getPasswordList();
    // passwordListStateTest = passwordListStateTest.filter(item => item._id !== passwordId); 
    // getPasswordList();

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
      if (length < 4 || length > 50) {
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
        // const index = passwordListStateTest.findIndex(item => item._id === editingState.editingPasswordId);

        // if (index !== -1) {
        //   passwordListStateTest[index].url = urlState;
        //   passwordListStateTest[index].password = finalPassword;
        // }

      } else {
        await axios.post('/api/passwords', {
          url: urlState,
          password: finalPassword,
          owner: loginState.loginUsername
        })

        // passwordListStateTest.push({_id: '5', url: urlState, password: finalPassword, owner: loginState.loginUsername});
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


  useEffect(() => {
    getPasswordList();
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <NavAfterLogin />
      <div className="mx-20">
        <Message receiver={loginState.loginUsername} getPasswordList={getPasswordList}/>
        <OwnPasswordListBox owner={loginState.loginUsername} passwordListState={passwordListState} deletePassword={deletePassword} setEditingPassword={setEditingPassword} />
        <SharePasswordListBox owner={loginState.loginUsername} passwordListState={passwordListState} />
        <AddUpdateBox editingState={editingState} errorState={errorState} urlState={urlState} setUrlState={setUrlState} passwordState={passwordState} setPasswordState={setPasswordState} useAlphabet={useAlphabet} useNumerals={useNumerals} useSymbols={useSymbols} setUseAlphabet={setUseAlphabet} setUseNumerals={setUseNumerals} setUseSymbols={setUseSymbols} length={length} setLength={setLength} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        <ShareRequestBox sender={loginState.loginUsername} />

      </div>
      
    </div>
  )
}