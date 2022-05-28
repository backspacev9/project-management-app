import Cookies from 'js-cookie';
import React from 'react';
import { setAuth } from '../../../redux/auth-reducer';
import { useAppDispatch } from '../../../redux/hooks';

const SignOutButton = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    Cookies.remove('token');
    dispatch(setAuth(false));
  };

  return (
    <>
      <button className="signOut-btn" onClick={handleSignOut}></button>
    </>
  );
};

export default SignOutButton;
