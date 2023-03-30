import React from 'react';
import { googleLogo } from '../../assets';

const GoogleAuthButton = ({ onClick, isSignIn }) => {
  return (
    <button onClick={onClick} className="w-full bg-slate-50 border-gray-300 border-2 text-black text-lg font-semibold rounded-md flex items-center gap-2 py-2 px-4">
      <img src={googleLogo} alt='google' className="h-5 w-5 object-fill" />
      <span>{`Sign ${isSignIn ? 'in' : 'up'} with Google`}</span>
    </button>
  );
};

export default GoogleAuthButton;
