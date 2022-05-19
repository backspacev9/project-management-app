import './board.scss';
import { ColumnInteface, TaskInterface } from './interface';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Column from './column-item';
import BtnAddColumn from '../btn-addColumn';
import { RootState } from '../../../../redux/store';
import { addSortedColumns, getBoardByID } from '../../../../redux/boards-reducer';
import { useEffect, useState } from 'react';
import { createOneColumn, updateOneColumn } from '../../../../redux/columns-reducer';

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const dispatch = useAppDispatch();
  const [currentColumn, setCurrentColumn] = useState<ColumnInteface>(Object);

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
  const dragStartColumn = (ev: React.DragEvent<HTMLDivElement>, column: ColumnInteface) => {
    console.log('start column drag-', column);
    setCurrentColumn(column);
  };

  const dragDropColumn = async (ev: React.DragEvent<HTMLDivElement>, column: ColumnInteface) => {
    ev.preventDefault();
    await dispatch(
      updateOneColumn({
        token: token,
        title: currentColumn.title,
        idBoard: currentBoard.id,
        idColumn: currentColumn.id,
        order: 0,
      })
    );
    await dispatch(
      updateOneColumn({
        token: token,
        title: column.title,
        idBoard: currentBoard.id,
        idColumn: column.id,
        order: currentColumn.order,
      })
    );
    await dispatch(
      updateOneColumn({
        token: token,
        title: currentColumn.title,
        idBoard: currentBoard.id,
        idColumn: currentColumn.id,
        order: column.order,
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
  };
  const dragOverColumn = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };
  const dragStartTask = (ev: React.DragEvent<HTMLDivElement>, task: TaskInterface) => {
    console.log('start task drag-', task);
  };
  const dragDropTask = (ev: React.DragEvent<HTMLDivElement>, task: TaskInterface) => {
    ev.preventDefault();
    console.log('drop task drag-', task);
  };
  const dragOverTask = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.currentTarget.style.boxShadow = '0px 8px 5px -5px rgba(34, 60, 80, 0.6)';
    ev.currentTarget.style.transform = 'translateY(-1px)';
  };
  const dragLeaveTask = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.currentTarget.style.boxShadow = 'none';
    ev.currentTarget.style.transform = 'none';
  };
  const dragEndTask = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.currentTarget.style.boxShadow = 'none';
    ev.currentTarget.style.transform = 'none';
  };
  return (
    <div className="Board">
      <div className="board-columns-container">
        {Object.keys(currentBoard).length !== 0
          ? currentBoard.columns.map((el) => (
              <Column
                columnDragEvents={{
                  dragStartColumn: dragStartColumn,
                  dragDropColumn: dragDropColumn,
                  dragOverColumn: dragOverColumn,
                }}
                taskDragEvents={{
                  dragStartTask: dragStartTask,
                  dragDropTask: dragDropTask,
                  dragOverTask: dragOverTask,
                  dragLeaveTask: dragLeaveTask,
                  dragEndTask: dragEndTask,
                }}
                column={el}
                key={el.id}
              />
            ))
          : ''}
        <BtnAddColumn btnOnclick={addColumn} />
      </div>
    </div>
  );
};

export default Board;
