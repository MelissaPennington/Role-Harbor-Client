import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1 style={{ color: 'white' }}>Hi there!</h1>
      <p style={{ color: 'white' }}>Click the button below to login!</p>
      <div className="d-flex justify-content-center"> {/* Centering container */}
        <Button
          type="button"
          size="lrg"
          className="copy-btn"
          onClick={signIn}
          style={{ width: '150px' }} // Set a fixed width for the button
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
