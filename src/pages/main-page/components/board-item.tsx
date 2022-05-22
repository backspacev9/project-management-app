import React from 'react';
import { Link } from 'react-router-dom';
import { IBoard } from '../../../utils/board-types';

interface IProps {
  board: IBoard;
}

const BoardItem: React.FC<IProps> = (props: IProps) => {
  const { board } = props;

  return (
    <Link to={`b/${board.id}`}>
      <div className="board-item">
        <div>{board.title}</div>
        <div>{board.id}</div>
      </div>
    </Link>
  );
};

export default BoardItem;
