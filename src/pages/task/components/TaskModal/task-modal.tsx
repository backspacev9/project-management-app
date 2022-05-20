import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import {
  createOneTask,
  handleVisibleModal,
  onChangeDescr,
  onChangeTitle,
} from '../../../../redux/tasks-reducer';
import './task-modal.css';

export const Modal = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const { title, description } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const hideModal = () => {
    dispatch(handleVisibleModal(false));
  };

  const onSubmit = () => {
    // dispatch(createOneTask({ token, boardId, columnId, title, order, description, userId }));
    console.log('task is  created');
    reset();
    hideModal();
    // dispatch(onChangeTitle(''));
    // dispatch(onChangeDescr(''));
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onChangeTitle(event.target.value));
  };

  const handleChangeDescr = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(onChangeDescr(event.target.value));
  };

  return (
    <div className="modal" data-testid="modal">
      <section className="modal-main">
        <button className="modal-close" onClick={hideModal}></button>
        <div className="modal-content">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="taskTitle"
              value={title}
              placeholder="Title"
              {...register('taskTitle', {
                required: 'Title cannot be empty',
                minLength: { value: 2, message: "Title can't be less than 2 characters" },
              })}
              name="taskTitle"
              onChange={(event) => handleChangeTitle(event)}
            />
            <div className="message-container">
              {errors.taskTitle && <div className="error-message">{errors.taskTitle.message}</div>}
            </div>
            <textarea
              name="taskDescription"
              id="taskDescription"
              placeholder="Description"
              value={description}
              onChange={(event) => handleChangeDescr(event)}
            ></textarea>
            <button type="submit" onClick={onSubmit}>
              Create Task
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
