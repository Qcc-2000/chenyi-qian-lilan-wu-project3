import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageDialog from './MessageDialog';

export default function Message({ receiver, getPasswordList }) {
  const [messages, setMessages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dropdownRef = useRef(null);

  async function getMessages() {
    try {
      const response = await axios.get('/api/messages/' + receiver);
      setMessages(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  function hideDropdownClickingOutside() {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }

  useEffect(() => {
    getMessages();
    hideDropdownClickingOutside();
  }, []);


  const handleAction = async (message, action) => {
    try {
      console.log(action);
      const response = await axios.post('/api/messages/' + message._id, {
        accepted: action,
      });
      console.log(response);
      getMessages();
      getPasswordList();
    } catch (error) {
      if (error.response) {
        setErrorState(error.response.data || 'Add or update password failed');
      } else if (error.request) {
        setErrorState('No response from the server');
      } else {
        setErrorState('Error: ' + error.message);
      }
    }
  };


  const openModal = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="relative flex justify-end m-3" ref={dropdownRef}>
      <button className="bg-gray-300 p-2 rounded-full relative" onClick={() => setShowDropdown(!showDropdown)}>
        <span>🔔</span>
        {messages.length > 0 && (
          <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {messages.length}
          </span>
        )}
        Messages
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(message)}
            >
              {`Message from ${message.sender}`}
            </div>
          ))}
        </div>
      )}

      {selectedMessage && (
        <MessageDialog
          message={selectedMessage}
          onAction={(message, action) => {
            handleAction(message, action);
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

