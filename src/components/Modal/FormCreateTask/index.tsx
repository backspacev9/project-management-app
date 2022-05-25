import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { createOneTask } from '../../../redux/tasks-reducer';
import { useTranslation } from 'react-i18next';
import { getBoardByID } from '../../../redux/boards-reducer';
import { handleVisibleModal } from '../../../redux/app-reducer';

interface ICreateTask {
  title: string;
  description: string;
}

export const FormCreateTask = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateTask>({ mode: 'onSubmit' });
  const { t } = useTranslation();
  // const params = useParams();
  // const { id } = params;

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);

  const onSubmit = async (data: ICreateTask) => {
    const { title, description } = data;
    await dispatch(
      createOneTask({
        token,
        boardId: currentBoard.id,
        columnId: currentColumnId,
        title,
        description,
        userId,
      })
    );
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    reset();
  };

  // const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = event.target?.files?.[0];
  //   const file = { name: target?.name, size: target?.size };
  //   dispatch(onChangeFile(file));
  // };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        placeholder={t('task_form.title')}
        {...register('title', {
          required: 'Title cannot be empty',
          minLength: { value: 2, message: "Title can't be less than 2 characters" },
        })}
        name="title"
      />
      <div className="message-container">
        {errors.title && <div className="error-message">{errors.title.message}</div>}
      </div>
      <textarea
        id="description"
        {...register('description', {
          required: 'Description cannot be empty',
          minLength: { value: 2, message: "Description can't be less than 2 characters" },
        })}
        name="description"
        placeholder={t('task_form.descr')}
      ></textarea>
      {/* <label>
        {t('task_form.file')}
        <input
          type="file"
          id="file"
          {...register('file')}
          name="file"
          onChange={(event) => handleChangeFile(event)}
        />
      </label> */}
      <button type="submit">{t('task_form.save')}</button>
    </form>
  );
};
