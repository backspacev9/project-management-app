import React, { useEffect } from 'react';
import BoardCreateButton from './CreateBoardButton';
import LocaleSelect from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';
import './index.scss';
import HomeButton from './HomeButton';
import MenuButton from './MenuButton';

const Header = () => {
  const isSticky = () => {
    const header = document.querySelector('.header') as HTMLElement;
    const position = window.scrollY;
    position > 0 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  useEffect(() => {
    window.addEventListener('scroll', isSticky);

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  return (
    <header className="header">
      <MenuButton />
      <HomeButton />
      <BoardCreateButton />
      <LocaleSelect />
      <div className="profile-container">
        <EditProfileButton />
        <SignOutButton />
      </div>
    </header>
  );
};

export default Header;
