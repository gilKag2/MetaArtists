import React, { useRef } from 'react';

const Input = ({ name, label, register, errorMessage, onChange, type = 'text', ...rest }) => {

  const inputRef = useRef();

  return (
    <div className='flex flex-col w-full gap-1 flex-1 h-full'>
      <div className='flex gap-2'>
        {label && (
          <label htmlFor={name} className='text-white font-semibold text-base self-start ml-1'>{label}</label>
        )}
        {errorMessage && <span className='text-red-600 self-start'>{errorMessage}</span>}
      </div>
      <input
        ref={inputRef}
        {...register}
        autoComplete='off'
        type={type}
        name={name}
        className="p-2 w-full h-8 rounded-md border-black border-2 font-medium outline-none"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Input;