import React from 'react';

const Input = ({ name, label, register, placeholder = '', type = 'text' }) => {
  return (
    <div className='flex flex-col items-center w-full gap-1'>
      {label && (
        <label htmlFor={name} className='text-black font-semibold text-base self-start ml-1'>{label}</label>
      )}
      <input {...register(name)} type={type} name={name} placeholder={placeholder} className="w-full h-8 rounded-md border-black border-2 focus:border-red-100" />
    </div>
  );
};

export default Input;