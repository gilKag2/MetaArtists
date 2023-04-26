import React from 'react';
import { useForm } from 'react-hook-form';

const CreateShowcase = ({ artist }) => {
  const { register, handleSubmit, formState: { errors }, resetField, setError } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col w-full h-full'>

    </form>
  );
};

export default CreateShowcase;