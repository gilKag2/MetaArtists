import React from 'react';
import { useForm } from 'react-hook-form';
import { FacebookAuthButton, GoogleAuthButton, Input, OrSeperator } from '../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api';
import useLogin from '../hooks/useLogin.js';

const formSchema = object({
  userName: string().required().min(4, 'Username must be at least 4 characters').max(12, 'Username must be less then 12 characters'),
  email: string().required().email("Please enter a valid email address"),
  password: string().required().min(4, 'Password must be at least 4 characters').max(12, 'Password must less then 12 characters')
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, resetField, setError } = useForm({
    resolver: yupResolver(formSchema)
  });

  const login = useLogin();

  const registerUserMutation = useMutation({
    mutationFn: async data => {
      return await registerUser(data);
    },
    onSuccess: (responseData) => {
      const { status, data } = responseData;
      login(data);
    },
    onError: (err) => handleRegisterError(err)

  });

  const handleRegisterError = (err) => {
    if (err.response?.status === 403) {
      const fieldWithError = Object.keys(err.response.data)[ 0 ];
      setError(fieldWithError, { type: 'exists', message: 'exists' }, { shouldFocus: true });
      resetField(fieldWithError, { keepError: true });
    }
  };

  const onFacebookClick = () => {
    console.log('facebook click');
  };
  const onGoogleClick = () => {
    console.log('google click');
  };

  return (
    <>
      <section id="register_form" className='flex flex-col justify-center items-center self-center h-full gap-4 mx-auto'>
        <form onSubmit={handleSubmit((data) => registerUserMutation.mutate(data))} className="flex flex-col gap-2 px-2 w-full">
          <Input name="userName" errorMessage={errors.userName?.message} register={register("userName")} label="Username" />
          <Input name="email" errorMessage={errors.email?.message} register={register("email")} label="Email" type='email' />
          <Input name="password" errorMessage={errors.password?.message} register={register("password")} label="Password" type='password' />
          <button disabled={registerUserMutation.isLoading} type="submit" className='flex-1 h-full w-full text-center bg-cyan-600 border-gray-300 border-2 text-white text-lg font-semibold rounded-md py-2'>Sign up</button>
        </form>
        <OrSeperator />
        <div className='flex items-center flex-col flex-wrap gap-2 pb-2 px-2 w-full'>
          <GoogleAuthButton width={getFormWidth()} onClick={onGoogleClick} />
          <FacebookAuthButton onClick={onFacebookClick} />
        </div>
      </section>
    </>
  );
};

const getFormWidth = () => {
  const formWidth = document.getElementById("register_form")?.offsetWidth;
  return formWidth > 0 ? formWidth : 250;
};


export default Register;