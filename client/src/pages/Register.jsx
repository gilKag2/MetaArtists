import React from 'react';
import { useForm } from 'react-hook-form';
import { FacebookAuthButton, GoogleAuthButton, Input } from '../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const formSchema = object({
  userName: string().required().min(4, 'Username must be at least 4 characters').max(12, 'Username must be less then 12 characters'),
  email: string().required().email("Please enter a valid email address"),
  password: string().required().min(4, 'Password must be at least 4 characters').max(12, 'Password must less then 12 characters')
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: yupResolver(formSchema)
  });

  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: async data => {
      await axios.post('http://localhost:4000/auth/register', data);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate('/');
    },
    onError: (err) => {
      if (err.response?.status === 403) {
        const fieldWithError = Object.keys(err.response.data)[ 0 ];
        setError(fieldWithError, { type: 'exists', message: 'exists' }, { shouldFocus: true });
      }
    }
  });


  const onSubmit = (data) => {
    registerUserMutation.mutate(data);

  };

  const onFacebookClick = () => {
    console.log('facebook click');
  };
  const onGoogleClick = () => {
    console.log('google click');
  };

  return (
    <>
      <section className='flex flex-col justify-center items-center self-center h-full gap-6 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-2 w-full">
          <Input name="userName" errorMessage={errors.userName?.message} register={register("userName")} label="Username" />
          <Input name="email" errorMessage={errors.email?.message} register={register("email")} label="Email" type='email' />
          <Input name="password" errorMessage={errors.password?.message} register={register("password")} label="Password" type='password' />
          <button disabled={registerUserMutation.isLoading} type="submit" className='w-full text-center bg-cyan-600 border-gray-300 border-2 text-white text-lg font-semibold rounded-md py-2'>Sign up</button>
        </form>
        <div className='flex flex-col flex-wrap gap-2 pb-2 px-2 w-full'>
          <FacebookAuthButton onClick={onFacebookClick} />
          <GoogleAuthButton onClick={onGoogleClick} />
        </div>
      </section>
    </>
  );
};

export default Register;