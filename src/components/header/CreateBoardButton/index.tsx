import React from 'react';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { modalActionEnum } from '../../../utils/enums';

const BoardCreateButton = () => {
  const dispatch = useAppDispatch();

  const showCreateBoard = () => {
    dispatch(setModalAction(modalActionEnum.createBoard));
    dispatch(handleVisibleModal(true));
  };

  return (
    <>
      <button onClick={showCreateBoard}>Create new board</button>
    </>
  );
};

export default BoardCreateButton;
