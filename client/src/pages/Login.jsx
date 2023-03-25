import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/auth/Input';

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input ></Input>
        <Input></Input>
        <Input></Input>
      </form>
    </section>
  );
};

export default Login;