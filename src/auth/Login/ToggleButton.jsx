// ToggleButton.js
import React from 'react';
import './login.css'

const ToggleButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default ToggleButton;