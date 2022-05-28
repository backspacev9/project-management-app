import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { removeAuth } from '../../../redux/auth-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { deleteCurrentUser } from '../../../redux/users-reducer';
import { HttpErrors } from '../../../utils/enums';

export const DeleteUser = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { id } = useAppSelector((state: RootState) => state.users.currentUser);
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigate();

  const handleCancel = () => {
    dispatch(handleVisibleModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteCurrentUser({ token, id }))
      .unwrap()
      .then((res) => {
        if (res === HttpErrors.Success) {
          setIsDeleted(true);
          removeAuth();
          navigation('/');
        }
      });
  };

  return (
    <div>
      {!isDeleted && (
        <>
          <p>Are you sure that you want to delete your profile?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
      {isDeleted && <p>Your profile was deleted.</p>}
    </div>
  );
};
