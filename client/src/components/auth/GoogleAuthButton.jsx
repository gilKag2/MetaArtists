import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authWithGoogle } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../../hooks/useLogin.js';
import SpinnerLoader from '../SpinnerLoader';

const GoogleAuthButton = ({ parentFormId }) => {
  const login = useLogin();

  const [ formWidth, setFormWidth ] = useState(0);


  useEffect(() => {
    setFormWidth(document.getElementById(parentFormId)?.offsetWidth || 250);
  }, []);


  const googleAuthMutation = useMutation({
    mutationFn: async data => {
      return await authWithGoogle(data);
    },
    onSuccess: async (responseData) => {
      const { status, data } = responseData;
      login(data);
    },
    onError: (err) => {
      if (err.response.status === 500) {

      }
      console.log(err);
    }
  });

  const onGoogleSuccess = (credentialResponse) => {
    googleAuthMutation.mutate(credentialResponse.credential);
  };

  const onGoogleError = (error) => {
    console.log(error);
    console.log('Login Failed');
  };

  if (googleAuthMutation.isLoading) return <SpinnerLoader />;

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <GoogleLogin
        width={formWidth}
        shape='circle'
        theme='outline'
        cancel_on_tap_outside='true'
        context='use'
        onSuccess={onGoogleSuccess}
        onError={onGoogleError}
      />
      {googleAuthMutation.isError && <p>Error</p>}
    </div>
  );
};


export default GoogleAuthButton;
