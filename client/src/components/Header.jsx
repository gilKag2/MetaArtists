import React from 'react';

const Header = () => {
  return (
    <header className='flex w-full justify-start items-center bg-gradient-to-r from-slate-800 to-slate-500 p-4'>
      <h1 className='ml-2 text-2xl font-semibold text-white'>
        Artist's Song Generator
      </h1>
    </header>
  );
};

export default Header;