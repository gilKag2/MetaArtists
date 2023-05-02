import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [ links, setLinks ] = useState([]);

  const onLinkClick = (e) => {
    e.preventDefault();
    navigate('/create');
  };
  const renderedLinks = links.map(link => (
    <a onClick={onLinkClick} key={link.href} href={link.href} className='flex items-center py-2 px-4 text-gray-600 hover:text-gray-900 box-content'>
      <img src={link.icon} />
      <span className={`text-sm font-medium text-gray-300`}>{link.label}</span>
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
    <aside className='flex flex-col flex-grow w-1/7 max-w-[130px] gap-5 h-full'>
      {renderedLinks}
    </aside>
  );
};

export default SideBar;