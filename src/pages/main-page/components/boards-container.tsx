import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { IBoard } from '../../../utils/board-types';

import BoardItem from './board-item';

const BoardsContainer = () => {
  const { boards } = useAppSelector((state: RootState) => state.boards);

  return (
    <div className="board-container">
      {boards.map((el: IBoard) => (
        <BoardItem board={el} key={el.id}></BoardItem>
      ))}
    </div>
  );
};

export default BoardsContainer;
