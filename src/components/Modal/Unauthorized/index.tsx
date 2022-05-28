import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';

export const UnauthorizedPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    navigation('/');
  }, [navigation]);

  const hideModal = () => {
    dispatch(handleVisibleModal(false));
  };

  return (
    <div>
      <div>User is unauthorized, please, login</div>
      <button onClick={hideModal}>OK</button>
    </div>
  );
};
