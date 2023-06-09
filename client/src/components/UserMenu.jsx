import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/user/userSlice';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';

const UserMenu = ({ user }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const menuRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClickOutsideHandler(menuRef, () => setIsOpen(false));

  const onMenuClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };


  const menuLinks = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' }
  ].map(link => (
    <Link onClick={onMenuClick} key={link.href} to={link.href} className='block font-medium px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300'>
      <li>{link.label}</li>
    </Link>
  ));

  return (
    <div className='relative' ref={menuRef}>
      <button className='flex items-center text-white focus:outline-none' onClick={onMenuClick}>
        <div className='flex gap-1 items-center bg-none outline-none'>
          <span className='font-medium text-xl mr-1 sm:block hidden'>{`${user.userName}`}</span>
          <svg
            role="img" height="16" width="16" aria-hidden="true" fill='white' viewBox="0 0 16 16"
            className={`sm:mr-0 mr-6 ${isOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'} transform`}>
            <path d="m14 6-6 6-6-6h12z" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <ul className={`flex flex-col justify-start gap-1 bg-slate-500 box-border rounded shadow-md w-fit absolute right-10 mt-2 p-1`}>
          {menuLinks}
          <hr className='border-gray-200' />
          <li onClick={onLogout} className='hover:cursor-pointer block font-medium px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300'>
            Log out
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;