import React from 'react';
import { Outlet } from 'react-router-dom';

import SearchBar from './SearchBar';

const MainLayout = () => {
  return (
    <div id='ok' className='flex flex-col h-full flex-grow'>
      <SearchBar />
      <Outlet />
    </div>
  );
};


export default MainLayout;