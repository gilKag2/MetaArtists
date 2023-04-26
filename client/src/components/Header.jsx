import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getUser } from '../redux/features/user/userSlice';
import { SpinnerLoader } from './';

const UserMenu = lazy(() => import('./UserMenu'));

const Header = () => {
  const user = useSelector(getUser);

  const navigate = useNavigate();

  const links = [
    { label: "Login", href: 'auth/login' },
    { label: "Register", href: 'auth/register' },
  ].map(link => (
    <Link key={link.href} to={link.href} className="text-white font-medium hover:text-gray-300 transition-colors duration-200">
      <li>
        {link.label}
      </li>
    </Link>
  ));

  const onTitleClick = () => {
    navigate('/');
  };

  return (
    <header className='flex w-full sm:h-1/6 justify-between items-center border-b-stone-400 pt-5'>
      <h1 onClick={onTitleClick} className='hover:cursor-pointer ml-4 text-2xl text-white font-medium hover:text-gray-300 transition-colors duration-200'>
        Meta Artists
      </h1>
      <ul className='flex flex-col gap-3 mr-4 sm:mr-16 sm:flex-row'>
        {user ?
          <Suspense fallback={<SpinnerLoader />}>
            <UserMenu user={user} />
          </Suspense> :
          links
        }
      </ul>
    </header>
  );
};

export default Header;