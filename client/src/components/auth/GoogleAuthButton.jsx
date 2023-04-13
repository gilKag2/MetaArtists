import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authWithGoogle } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../../hooks/useLogin.js';

const GoogleAuthButton = ({ width }) => {
  const login = useLogin();

  console.log(width);
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

  const onGoogleError = (error) => {
    console.log(error);
    console.log('Login Failed');
  };



  return (
    <div className='w-full'>
      <GoogleLogin
        width={width}
        shape='circle'
        theme='outline'
        cancel_on_tap_outside='true'
        context='use'
        onSuccess={onGoogleSuccess}
        onError={onGoogleError}
      />
    </div>
  );
};


export default GoogleAuthButton;
