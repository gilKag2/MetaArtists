import React from 'react';
import { useForm } from 'react-hook-form';
import { FacebookAuthButton, GoogleAuthButton, Input } from '../components';

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onFacebookClick = () => {
    console.log('facebook click');
  };
  const onGoogleClick = () => {
    console.log('google click');
  };

  return (
    <>
      <section className='flex flex-col justify-center items-center self-center h-full gap-6 mx-auto '>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-2 w-full">
          <Input name={"username"} register={register} label="Username" />
          <Input name={"email"} register={register} label="Email" type='email' />
          <Input name={"password"} register={register} label="Password" type='password' />
          <button type="submit" className='w-full text-center bg-cyan-600 border-gray-300 border-2 text-white text-lg font-semibold rounded-md py-2'>Sign up</button>
        </form>
        <div className='flex flex-col gap-2 pb-2 px-2 w-full'>
          <FacebookAuthButton onClick={onFacebookClick} />
          <GoogleAuthButton onClick={onGoogleClick} />
        </div>
      </section>
    </>
  );
};

export default Register;