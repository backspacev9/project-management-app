import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { modalActionEnum } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';

const BoardCreateButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const showCreateBoard = () => {
    dispatch(setModalAction(modalActionEnum.createBoard));
  };

  return (
    <>
      <button onClick={showCreateBoard}>{t('create_board')}</button>
    </>
  );
};

export default BoardCreateButton;
