import React from 'react';
import { useForm } from 'react-hook-form';
import { createBoard, getAllBoards } from '../api/boards';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

type IForm = {
  title: string;
};

const BoardCreation = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<IForm>();

  const onSubmit = async (data: IForm) => {
    await createBoard(token, data.title);
    const res = await getAllBoards(token);
    console.log(res);
  };

  return (
    <>
      <div className="auth">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Board title" id="board-title" {...register('title')} />
          <button type="submit" className="registration-btn">
            Create Board
          </button>
        </form>
      </div>
    </>
  );
};

export default BoardCreation;
