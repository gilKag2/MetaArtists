import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [ links, setLinks ] = useState([]);
  const [ showMenu, setShowMenu ] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(getUser);

  const onLinkClick = (e) => {
    e.preventDefault();
    setShowMenu(false);
    navigate('/create');

  };


  const renderedLinks = links.map(link => (
    <a onClick={onLinkClick} key={link.href} href={link.href} className='flex items-center py-2 px-4 '>
      <img src={link.icon} />
      <span className={`text-sm font-medium text-gray-300 hover:text-white box-content`}>{link.label}</span>
    </a>
  ));

  useEffect(() => {
    if (!user) return;
    setLinks([
      { label: 'My Showcases', href: '', icon: '' },
      { label: 'Create Showcase', href: 'create', icon: '' }
    ]);
  }, [ user ]);

  return (
    <>
      <aside className='sm:flex sm:flex-col hidden flex-grow w-1/7 max-w-[130px] gap-5 h-full'>
        {renderedLinks}
      </aside>
      <svg onClick={() => setShowMenu(true)} height="40" viewBox="0 0 20 20" width="20" focusable="false" className='sm:hidden ml-4 absolute top-5 w-10'>
        <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" fill='white' />
      </svg>
    </>
  );
};

export default SideBar;