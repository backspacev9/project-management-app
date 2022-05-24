import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { getCurrentUser } from '../../../redux/users-reducer';

const EditProfileButton = () => {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const navigation = useNavigate();

  const handleEditProfile = () => {
    dispatch(getCurrentUser({ token, id: userId })).then(() =>
      navigation('/edit-profile', { replace: true })
    );
  };

  return (
    <>
      <NavLink to="/edit-profile">
        <button onClick={handleEditProfile}>Edit profile</button>
      </NavLink>
    </>
  );
};

export default EditProfileButton;
