import React from 'react';

const ErrorMessage = ({ children, message }) => (
  <p
    style={{
      textAlign: 'center',
      color: 'red',
      fontSize: '20px',
      margin: '50px auto',
    }}
  >
    {message ? message: children || 'An error has occurred. Please try again later.'}
  </p>
);

export default ErrorMessage;