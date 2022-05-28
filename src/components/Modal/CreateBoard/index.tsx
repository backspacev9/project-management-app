import React from 'react';
import { useForm } from 'react-hook-form';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { createOneBoard, getBoards } from '../../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';

type IForm = {
  title: string;
  description: string;
};

const CreateBoard = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const { t } = useTranslation();

  const onSubmit = async (data: IForm) => {
    const args = {
      token: token,
      title: data.title,
      description: data.description,
    };
    await dispatch(createOneBoard(args));
    await dispatch(getBoards(token));
    reset();
    dispatch(handleVisibleModal(false));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder={t('task_form.title')}
            id="board-title"
            {...register('title')}
          />
          <input
            type="text"
            placeholder={t('task_form.descr')}
            id="board-description"
            {...register('description')}
          />
          <button type="submit" className="registration-btn">
            {t('board.create_btn')}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBoard;
