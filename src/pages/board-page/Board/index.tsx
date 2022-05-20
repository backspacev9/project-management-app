import './board-item.scss';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Column from '../Column';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { createOneColumn, getColumns, updateOneColumn } from '../../../redux/columns-reducer';
import { IColumnWithTasks } from '../../../utils/columns-type';
import { ITaskWithFiles } from '../../../utils/task-types';
import BoardHeader from '../components/header';
import { useParams } from 'react-router-dom';
import { getBoardByID } from '../../../redux/boards-reducer';
import BtnAddColumn from '../../../components/board/btn-addColumn';

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { columns } = useAppSelector((state: RootState) => state.columns);
  const dispatch = useAppDispatch();
  const [currentColumn, setCurrentColumn] = useState<IColumnWithTasks>(Object);
  const params = useParams();
  const { id } = params;

  const setBoard = async () => {
    if (id) {
      await dispatch(getBoardByID({ token, id }));
      await dispatch(getColumns({ token, id }));
    }
  };
  useEffect(() => {
    setBoard();
    console.log(currentBoard);
    console.log('state columns--', columns);
  }, [token]);

  const addColumn = async (columnName: string) => {
    const newColumnOrder = columns.length === 0 ? 1 : currentBoard.columns.length + 1;
    await dispatch(
      createOneColumn({
        token: token,
        title: columnName,
        idBoard: currentBoard.id,
        order: newColumnOrder,
      })
    );
    await dispatch(getColumns({ token, id: currentBoard.id }));
  };
  const dragStartColumn = (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => {
    console.log('start column drag-', column);
    setCurrentColumn(column);
  };

  const dragDropColumn = async (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => {
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
    await dispatch(getColumns({ token, id: currentBoard.id }));
  };
  const dragOverColumn = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };
  const dragStartTask = (ev: React.DragEvent<HTMLDivElement>, task: ITaskWithFiles) => {
    console.log('start task drag-', task);
  };
  const dragDropTask = (ev: React.DragEvent<HTMLDivElement>, task: ITaskWithFiles) => {
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
      <BoardHeader title={currentBoard.title} />
      <div className="board-columns-container">
        {Object.keys(columns).length !== 0
          ? columns.map((el) => (
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
