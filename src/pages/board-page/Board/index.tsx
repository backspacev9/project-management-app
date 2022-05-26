import './index.scss';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Column from '../Column';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { createOneColumn, getColumns, updateOneColumn } from '../../../redux/columns-reducer';
import BoardHeader from '../components/header';
import { useParams } from 'react-router-dom';
import { getBoardByID, setColumns } from '../../../redux/boards-reducer';
import BtnAddColumn from '../../../components/board/btn-addColumn';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { IColumnWithTasks } from '../../../utils/columns-type';

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const params = useParams();
  const { id } = params;
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { columns } = useAppSelector((state: RootState) => state.boards.currentBoard);
  const dispatch = useAppDispatch();
  const setBoard = async () => {
    if (id && token) {
      await dispatch(getBoardByID({ token, id }));
      console.log(columns);
    }
  };

  useEffect(() => {
    setBoard();
  }, [token]);

  const addColumn = async (columnName: string) => {
    await dispatch(
      createOneColumn({
        token: token,
        title: columnName,
        idBoard: currentBoard.id,
      })
    );
    setBoard();
  };
  const reorderColumns = (startIndex: number, endIndex: number) => {
    const result = Array.from(columns);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const dragEndColumn = async (param: DropResult) => {
    const order = param.destination ? param.destination.index + 1 : columns.length;
    const draggedColumn = columns[param.source.index];
    const distIndex = param.destination ? param.destination.index : columns.length - 1;

    if (param.destination) {
      if (param.destination.index === param.source.index) return;
    }
    console.log('dist', distIndex);
    const items = reorderColumns(param.source.index, distIndex);
    console.log('items', items);
    dispatch(setColumns(items));
    await dispatch(
      updateOneColumn({
        token,
        title: draggedColumn.title,
        idBoard: currentBoard.id,
        idColumn: draggedColumn.id,
        order: order,
      })
    );
    setBoard();
  };

  return (
    <div className="Board">
      <BoardHeader title={currentBoard.title} />

      <DragDropContext onDragEnd={(param) => dragEndColumn(param)}>
        <Droppable droppableId="board-drop-area" type="PERSON" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="board-columns-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns && Object.keys(columns).length !== 0
                ? columns.map((el, index) => (
                    <Draggable key={index} draggableId={`cdrag-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <Column column={el} key={el.id} provided={provided} />
                      )}
                    </Draggable>
                  ))
                : ''}
              {provided.placeholder}
              <BtnAddColumn btnOnclick={addColumn} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
