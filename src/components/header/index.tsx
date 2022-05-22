import Cookies from 'js-cookie';
import React from 'react';
import { setAuth } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../redux/hooks';

const Header = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    Cookies.remove('token');
    dispatch(setAuth(false));
  };

  return (
    <>
      <button>Edit profile</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <button>Create new board</button>
      <select name="localization" id="localization">
        <option value="en">English</option>
        <option value="ru">Russian</option>
      </select>
    </>
  );
};

export default Header;
