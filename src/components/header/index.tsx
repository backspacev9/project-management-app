import React from 'react';
import BoardCreateButton from './CreateBoardButton';
import { LocaleSelect } from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';

const Header = () => {
  return (
    <>
      <EditProfileButton />
      <SignOutButton />
      <BoardCreateButton />
      <LocaleSelect />
    </>
  );
};

export default Header;
