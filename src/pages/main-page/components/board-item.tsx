import React from 'react';
import { Link } from 'react-router-dom';
import { setModalAction } from '../../../redux/app-reducer';
import { setCurrentBoard } from '../../../redux/boards-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { IBoard } from '../../../utils/board-types';
import { modalActionEnum } from '../../../utils/enums';

interface IProps {
  board: IBoard;
}

const BoardItem: React.FC<IProps> = (props: IProps) => {
  const { board } = props;
  const dispatch = useAppDispatch();

  const handleClick = (modalAction: string) => {
    dispatch(setCurrentBoard(board));
    dispatch(setModalAction(modalAction));
  };

  return (
    <div className="board-item">
      <Link to={`b/${board.id}`}>
        <div className="board-info">
          <div>{board.title}</div>
          <div>{board.description}</div>
        </div>
      </Link>
      <div>
        <button onClick={() => handleClick(modalActionEnum.updateBoard)}>update</button>
        <button onClick={() => handleClick(modalActionEnum.deleteBoard)}>delete</button>
      </div>
    </div>
  );
};

export default BoardItem;
