import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import { createOneTask, handleVisibleModal } from '../../../../redux/tasks-reducer';
import '../../../../components/Modal/index.css';
import { useTranslation } from 'react-i18next';

interface ICreateTask {
  taskTitle: string;
  taskDescription: string;
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

  const onSubmit = () => {
    // dispatch(createOneTask({ token, boardId, columnId, title, order, description, userId }));
    console.log('task is  created');
    reset();
    dispatch(handleVisibleModal(false));
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
        id="taskTitle"
        placeholder={t('task_form.title')}
        {...register('taskTitle', {
          required: 'Title cannot be empty',
          minLength: { value: 2, message: "Title can't be less than 2 characters" },
        })}
        name="taskTitle"
      />
      <div className="message-container">
        {errors.taskTitle && <div className="error-message">{errors.taskTitle.message}</div>}
      </div>
      <textarea
        name="taskDescription"
        id="taskDescription"
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
      <button type="submit" onClick={onSubmit}>
        {t('task_form.save')}
      </button>
    </form>
  );
};
