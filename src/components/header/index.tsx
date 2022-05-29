import React from 'react';
import BoardCreateButton from './CreateBoardButton';
import LocaleSelect from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';
import './index.scss';
import HomeButton from './HomeButton';

const Header = () => {
  return (
    <header className="header">
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
