import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { object, string } from 'yup';
import { FacebookAuthButton, GoogleAuthButton, Input } from '../components';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from '';

const formSchema = object({
  email: string().required().email("Please enter a valid email address"),
  password: string().required().min(4, 'Password must be at least 4 characters').max(12, 'Password must less then 12 characters')
});

const Login = () => {

  const { register, handleSubmit, formState: { errors }, resetField, setError } = useForm({
    resolver: yupResolver(formSchema)
  });

  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: async data => {
      await loginUser(data);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate('/');
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
    <section className='flex flex-col justify-center items-center self-center h-full gap-6 mx-auto'>
      <form onSubmit={handleSubmit((data) => loginUserMutation.mutate(data))} className="flex flex-col gap-2 px-2 w-full">
        <Input name="email" errorMessage={errors.email?.message} register={register("email")} label="Email" type='email' />
        <Input name="password" errorMessage={errors.password?.message} register={register("password")} label="Password" type='password' />
        <button disabled={loginUserMutation.isLoading} type="submit" className='w-full text-center bg-cyan-600 border-gray-300 border-2 text-white text-lg font-semibold rounded-md py-2'>Sign up</button>
      </form>
      <div className='flex flex-col flex-wrap gap-2 pb-2 px-2 w-full'>
        <FacebookLogin

        />
        {/* <FacebookAuthButton isSignIn onClick={onFacebookClick} />
        <GoogleAuthButton isSignIn onClick={onGoogleClick} /> */}
      </div>
    </section>
  );
};

export default Login;