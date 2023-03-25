import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {

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
    <header className='flex w-full h-fit sm:h-1/6 justify-between items-center border-b-stone-400'>
      <h1 className='ml-2 text-2xl font-semibold text-white'>
        Artist's Song Generator
      </h1>
      <ul className='flex flex-col gap-3 mr-4 sm:mr-16 sm:flex-row'>
        {links}
      </ul>
    </header>
  );
};

export default Header;