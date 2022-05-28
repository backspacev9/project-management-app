import React from 'react';
import BoardCreateButton from './CreateBoardButton';
import { LocaleSelect } from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';
import './index.scss';

const Header = () => {
  return (
    <header className="header">
      <BoardCreateButton />
      <EditProfileButton />
      <SignOutButton />
      <LocaleSelect />
    </header>
  );
};

export default Header;
