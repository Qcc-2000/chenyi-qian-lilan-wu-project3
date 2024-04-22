import React from 'react';

export default function MessageDialog({ message, onAction, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            There is share request from {message.sender} to you. Would you like to share all of your passwords with {message.sender} ?
          </h3>
          <div className="items-center px-4 py-3">
            <button
              id="accept-btn"
              className="px-4 py-2 bg-red-900 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-700"
              onClick={() => onAction(message, true)}
            >
              Accept
            </button>
            <button
              id="reject-btn"
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-700"
              onClick={() => onAction(message, false)}
            >
              Reject
            </button>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-gray-200 text-black text-base font-medium rounded-md w-full hover:bg-gray-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

