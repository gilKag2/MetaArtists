import React from 'react';

const Input = ({ name, label, register, errorMessage, placeholder = '', type = 'text' }) => {
  return (
    <div className='flex flex-col w-full gap-1 flex-1 h-full'>
      <div className='flex gap-2'>
        {label && (
          <label htmlFor={name} className='text-black font-semibold text-base self-start ml-1'>{label}</label>
        )}
        {errorMessage && <span className='text-red-600 self-start'>{errorMessage}</span>}
      </div>
      <input
        {...register}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`p-2 w-full h-8 rounded-md border-black border-2 focus:border-red-100`}


      />
    </div>
  );
};

export default Input;