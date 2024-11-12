// ErrorMessage.js
import React from 'react';
import './errorMessage.css'

const ErrorMessage = ({ error }) => {
  return error ? <p>{error}</p> : null;
};

export default ErrorMessage;
