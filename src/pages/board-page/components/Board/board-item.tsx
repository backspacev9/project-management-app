import BoardHeader from './header';
import './board.scss';
import { BoardInteface, ColumnInteface } from './interface';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Column from './column-item';
import BtnAddColumn from '../btn-addColumn';
import { RootState } from '../../../../redux/store';
import { createOneColumn, getBoardByID } from '../../../../redux/boards-reducer';

interface boardProps {
  board: BoardInteface;
}

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const dispatch = useAppDispatch();
  //const { board } = props;
  //console.log(currentBoard);

  const addColumn = async (columnName: string) => {
    const columnOrder = currentBoard.columns.length === 0 ? 1 : currentBoard.columns.length + 1;
    await dispatch(
      createOneColumn({
        token: token,
        title: columnName,
        idBoard: currentBoard.id,
        order: columnOrder,
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    console.log('addCol+text:', columnName);
  };
  return (
    <div className="Board">
      <div className="board-columns-container">
        {Object.keys(currentBoard).length !== 0
          ? currentBoard.columns.map((el) => <Column column={el} key={el.id} />)
          : ''}
        <BtnAddColumn btnOnclick={addColumn} />
      </div>
    </div>
  );
};

export default Board;
