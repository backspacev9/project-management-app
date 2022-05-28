import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { setAuth } from '../../../redux/auth-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { deleteCurrentUser } from '../../../redux/users-reducer';
import { HttpErrors } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';

export const DeleteUser = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { id } = useAppSelector((state: RootState) => state.users.currentUser);
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const { t } = useTranslation();

  const handleCancel = () => {
    dispatch(handleVisibleModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteCurrentUser({ token, id }))
      .unwrap()
      .then((res) => {
        if (res === HttpErrors.Success) {
          setIsDeleted(true);
          Cookies.remove('token');
          dispatch(setAuth(false));
        }
      });
  };

  return (
    <div>
      {!isDeleted && (
        <>
          <p>{t('user.delete_answ')}</p>
          <button onClick={handleDelete}>{t('delete_btn')}</button>
          <button onClick={handleCancel}>{t('cansel_btn')}</button>
        </>
      )}
      {isDeleted && <p>{t('user.delete_msg')}</p>}
    </div>
  );
};
