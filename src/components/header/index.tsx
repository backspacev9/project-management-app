import React from 'react';
import BoardCreateButton from './CreateBoardButton';
import LocaleSelect from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';
import './index.scss';
import HomeButton from './HomeButton';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header className="header">
      {location.pathname.includes('/main/b/') && <HomeButton />}
      <BoardCreateButton />
      <EditProfileButton />
      <SignOutButton />
      <LocaleSelect />
    </header>
  );
};

export default Header;
