import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authWithGoogle } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../../hooks/useLogin.js';

const GoogleAuthButton = () => {
  const login = useLogin();

  const googleAuthMutation = useMutation({
    mutationFn: async data => {
      return await authWithGoogle(data);
    },
    onSuccess: async (responseData) => {
      const { status, data } = responseData;
      login(data);
    },
    onError: () => console.log('err')
  });

  const onGoogleSuccess = (credentialResponse) => {
    googleAuthMutation.mutate(credentialResponse.credential);
  };


  return (
    // <button onClick={onClick} className="w-full bg-slate-50 border-gray-300 border-2 text-black text-lg font-semibold rounded-md flex items-center gap-2 py-2 px-4">
    //   <img src={googleLogo} alt='google' className="h-5 w-5 object-fill" />
    //   <span>{`Sign ${isSignIn ? 'in' : 'up'} with Google`}</span>
    // </button>

    <div className=''>
      <GoogleLogin shape='circle' size='large'
        theme='outline'
        cancel_on_tap_outside='true'
        context='use'
        useOneTap='false'
        onSuccess={onGoogleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default GoogleAuthButton;
