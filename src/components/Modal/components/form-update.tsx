import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import {
  changeCurrentTaskDescr,
  changeCurrentTaskTitle,
  createOneTask,
  updateOneTask,
} from '../../../redux/tasks-reducer';
import '../index.css';
import { useTranslation } from 'react-i18next';
import { getBoardByID } from '../../../redux/boards-reducer';
import { handleVisibleModal } from '../../../redux/app-reducer';

interface IUpdateTask {
  title: string;
  description: string;
  file: File | null | undefined;
}

export const FormUpdateTask = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateTask>({ mode: 'onSubmit' });
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);

  const onSubmit = async (data: IUpdateTask) => {
    const { title, description } = data;
    console.log(currentTask);
    await dispatch(
      updateOneTask({
        token,
        boardId: currentBoard.id,
        columnId: currentColumnId,
        taskId: currentTask.id,
        title,
        order: currentTask.order,
        description,
        userId,
      })
    );
    reset();
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
  };

  // const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = event.target?.files?.[0];
  //   const file = { name: target?.name, size: target?.size };
  //   dispatch(onChangeFile(file));
  // };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const inpName = target.name;
    if (inpName === 'file') {
      // setState({ ...state, file: event.target?.files?.[0] });
    } else if (inpName === 'title') {
      dispatch(changeCurrentTaskTitle(target.value));
    } else if (inpName === 'description') {
      dispatch(changeCurrentTaskDescr(target.value));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        value={currentTask.title}
        placeholder={t('task_form.title')}
        {...register('title', {
          required: 'Title cannot be empty',
          minLength: { value: 2, message: "Title can't be less than 2 characters" },
        })}
        name="title"
        onChange={(e) => handleChange(e)}
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
        value={currentTask.description}
        placeholder={t('task_form.descr')}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <label>
        {t('task_form.file')}
        <input type="file" id="file" {...register('file', {})} name="file" />
      </label>
      <button type="submit">{t('task_form.save')}</button>
    </form>
  );
};
