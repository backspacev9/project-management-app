import React from 'react';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { Modal } from '../../Modal';
import BoardCreation from './CreateBoardModal';

interface IProps {
  onFormSubmit: (modal: JSX.Element) => void;
}

const BoardCreateButton = (props: IProps) => {
  const { onFormSubmit } = props;
  const dispatch = useAppDispatch();
  const { isModalVisible } = useAppSelector((state: RootState) => state.app);
  const boardCreationComponent = BoardCreation();

  const showCreateBoard = () => {
    onFormSubmit(boardCreationComponent);
    dispatch(handleVisibleModal(true));
  };

  return (
    <>
      <button onClick={showCreateBoard}>Create new board</button>
    </>
  );
};

export default BoardCreateButton;
