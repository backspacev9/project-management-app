import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';

export const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleChangePage = () => {
    navigation('/main', { replace: true });
    dispatch(handleVisibleModal(false));
  };

  return (
    <div>
      <p>Information about User was updated</p>
      <button onClick={handleChangePage}>Go to main page</button>
    </div>
  );
};
