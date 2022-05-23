import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { setAuth } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { Modal } from '../Modal';
import BoardCreateButton from './CreateBoard/CreateBoardButton';
import { LocaleSelect } from './LocalesSelect';
import EditProfileButton from './UserProfile/EditProfileButton';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isModalVisible } = useAppSelector((state: RootState) => state.app);
  const [modalPage, setModalPage] = useState({} as JSX.Element);

  const handleSignOut = () => {
    Cookies.remove('token');
    dispatch(setAuth(false));
  };

  const formSubmit = (modalPage: JSX.Element) => {
    setModalPage(modalPage);
  };

  return (
    <>
      <EditProfileButton onFormSubmit={formSubmit} />
      <button onClick={handleSignOut}>Sign Out</button>
      <BoardCreateButton onFormSubmit={formSubmit} />
      <LocaleSelect />
      {isModalVisible && <Modal component={modalPage}></Modal>}
    </>
  );
};

export default Header;
