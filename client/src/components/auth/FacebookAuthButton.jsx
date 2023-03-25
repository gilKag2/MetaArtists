import React from 'react';
import { facebookLogo } from '../../assets';

const FacebookAuthButton = ({ onClick, isSignIn }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 border-gray-300 border-2 text-white text-lg font-semibold rounded-md flex items-center gap-2 py-2 px-4">
      <img src={facebookLogo} alt='facebook' className="h-5 w-5 object-fill" />
      <span >{`Sign ${isSignIn ? 'in' : 'up'} with Facebook`}</span>
    </button>
  );
};

export default FacebookAuthButton;