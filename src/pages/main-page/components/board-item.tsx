import React from 'react';
import { IBoard } from '../../../utils/board-types';

interface IProps {
  board: IBoard;
}

const BoardItem: React.FC<IProps> = (props: IProps) => {
  const { board } = props;

  return (
    <div className="board-item">
      <div>{board.title}</div>
      <div>{board.id}</div>
    </div>
  );
};

export default BoardItem;
