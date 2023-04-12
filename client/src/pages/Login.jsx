import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { object, string } from 'yup';
import { FacebookAuthButton, GoogleAuthButton, Input, OrSeperator } from '../components';
import { loginUser } from '../api/auth.js';
import useLogin from '../hooks/useLogin';

const formSchema = object({
  email: string().required().email("Please enter a valid email address"),
  password: string().required().min(4, 'Password must be at least 4 characters').max(12, 'Password must less then 12 characters')
});

const Login = () => {
  const { register, handleSubmit, formState: { errors }, resetField, setError } = useForm({
    resolver: yupResolver(formSchema)
  });

  const login = useLogin();


  const loginUserMutation = useMutation({
    mutationFn: async data => {
      return await loginUser(data);
    },
    onSuccess: (responseData) => {
      const { status, data } = responseData;
      login(data);
    },
    onError: (err) => handleLoginError(err)
  });

  const handleLoginError = (err) => {

  };

  const onFacebookClick = () => {
    console.log('facebook click');
  };
  const onGoogleClick = () => {
    console.log('google click');
  };


  return (
    <section className='flex flex-col justify-center items-center self-center h-full gap-4 mx-auto'>
      <form onSubmit={handleSubmit((data) => loginUserMutation.mutate(data))} className="flex flex-col gap-2 px-2 w-full">
        <Input name="email" errorMessage={errors.email?.message} register={register("email")} label="Email" type='email' />
        <Input name="password" errorMessage={errors.password?.message} register={register("password")} label="Password" type='password' />
        <button disabled={loginUserMutation.isLoading} type="submit" className='w-full text-center bg-cyan-600 border-gray-300 border-2
         text-white text-lg font-semibold rounded-md py-2'>
          Login
        </button>
      </form>
      <OrSeperator />
      <div className='flex items-center flex-col flex-wrap gap-2 pb-2 px-2 w-full'>
        <GoogleAuthButton isSignIn onClick={onGoogleClick} />
        <FacebookAuthButton isSignIn onClick={onFacebookClick} />
      </div>
    </section>
  );
};

export default Login;