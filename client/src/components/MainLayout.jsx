import React from 'react';
import { Outlet } from 'react-router-dom';

import SearchBar from './SearchBar';
import SideBar from './SideBar';

const MainLayout = () => {
  return (
    <div className='flex h-full w-full'>
      <div className='mt-10'>
        <SideBar />
      </div>
      <div className='h-full flex flex-1'>
        <SearchBar />
        <Outlet />
      </div>
    </div>
  );
};


export default MainLayout;