import React from 'react';
import BoardCreation from './board-creation';
import { LocaleSelect } from './LocalesSelect';

const Header = () => {
  return (
    <>
      <BoardCreation />
      <LocaleSelect />
    </>
  );
};

export default Header;
