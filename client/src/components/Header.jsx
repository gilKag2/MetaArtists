import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUser } from '../redux/features/user/userSlice';
import SpinnerLoader from './SpinnerLoader';

const UserMenu = lazy(() => import('./UserMenu'));

const Header = () => {
  const user = useSelector(getUser);

  const links = [
    { label: "Login", href: 'auth/login' },
    { label: "Register", href: 'auth/register' },
  ].map(link => (
    <Link key={link.href} to={link.href}>
      <li>
        {link.label}
      </li>
    </Link>
  ));

  return (
    <header className='flex w-full h-fit sm:h-1/6 justify-between items-center border-b-stone-400 mt-3'>
      <h1 className='ml-2 text-2xl font-semibold text-white'>
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