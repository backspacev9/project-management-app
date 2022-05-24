import React from 'react';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { modalActionEnum } from '../../../utils/enums';

const EditProfileButton = () => {
  const dispatch = useAppDispatch();

  const showUserProfile = () => {
    dispatch(setModalAction(modalActionEnum.editProfile));
    dispatch(handleVisibleModal(true));
  };

  return (
    <>
      <button onClick={showUserProfile}>Edit profile</button>
    </>
  );
};

export default EditProfileButton;
