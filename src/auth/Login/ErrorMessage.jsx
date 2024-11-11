// ErrorMessage.js
import React from 'react';
import './login.css'

const ErrorMessage = ({ error }) => {
  return error ? <p>{error}</p> : null;
};

export default ErrorMessage;
