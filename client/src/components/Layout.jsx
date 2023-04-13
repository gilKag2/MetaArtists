import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!mainRef.current) return;

    mainRef.current.style.minHeight = `${calculateMainElementHeight()}px`;
  }, []);

  const calculateMainElementHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;

    const mainHeight = window.innerHeight - headerHeight;
    if (location.pathname.includes('/auth')) {
      const authFooterHeight = document.querySelector('footer').offsetHeight;
      return mainHeight - authFooterHeight;
    }
    return mainHeight;
  };

  return (
    <div className='flex flex-col h-full bg-gradient-to-t from-zinc-800 to-zinc-600'>
      <Header />
      <main ref={mainRef} className='flex flex-1 overflow-auto' >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;