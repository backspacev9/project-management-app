import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { modalActionEnum } from '../../../utils/enums';

const BoardCreateButton = () => {
  const dispatch = useAppDispatch();

  const showCreateBoard = () => {
    dispatch(setModalAction(modalActionEnum.createBoard));
  };

  return (
    <>
      <button onClick={showCreateBoard}>Create new board</button>
    </>
  );
};

export default BoardCreateButton;
