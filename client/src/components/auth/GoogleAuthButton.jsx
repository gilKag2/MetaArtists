import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authWithGoogle } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../../hooks/useLogin.js';

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
        width={formWidth}
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
