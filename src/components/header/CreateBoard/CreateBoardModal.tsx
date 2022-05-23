import React from 'react';
import { useForm } from 'react-hook-form';
import { createOneBoard, getBoards } from '../../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

type IForm = {
  title: string;
  description: string;
};

const BoardCreation = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { register, handleSubmit, reset } = useForm<IForm>();

  const onSubmit = async (data: IForm) => {
    const args = {
      token: token,
      title: data.title,
      description: data.description,
    };
    await dispatch(createOneBoard(args));
    await dispatch(getBoards(token));
    reset();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Board title" id="board-title" {...register('title')} />
          <input
            type="text"
            placeholder="Board description"
            id="board-description"
            {...register('description')}
          />
          <button type="submit" className="registration-btn">
            Create Board
          </button>
        </form>
      </div>
    </>
  );
};

export default BoardCreation;
