import React, { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const mainRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
    const windowHeight = window.innerHeight;
    const mainHeight = windowHeight - headerHeight - footerHeight;

    mainRef.current.style.minHeight = `${mainHeight}px`;
  }, [ location ]);



  return (
    <div className='flex flex-col h-full bg-gradient-to-t from-zinc-800 to-zinc-600'>
      <Header />
      <main ref={mainRef} className='flex overflow-auto flex-1 w-full pt-4'>
        <div className='min-h-full w-full'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;