import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Footer from './Footer';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/features/user/userSlice';

const AuthLayout = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className='flex justify-center items-center  h-full'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;