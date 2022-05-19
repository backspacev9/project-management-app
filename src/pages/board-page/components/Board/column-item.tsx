import { useEffect } from 'react';
import { createOneTask, getBoardByID, sortTask } from '../../../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import BtnAddTask from '../btn-addTask';
import { ColumnInteface, TaskInterface } from './interface';
import Task, { ITaskDragEvents } from './task-item';

export interface IColumnDragEvents {
  dragStartColumn: (ev: React.DragEvent<HTMLDivElement>, column: ColumnInteface) => void;
  // dragLeaveColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  // dragEndColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragOverColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragDropColumn: (ev: React.DragEvent<HTMLDivElement>, column: ColumnInteface) => void;
}

interface ColumnProps {
  column: ColumnInteface;
  columnDragEvents: IColumnDragEvents;
  taskDragEvents: ITaskDragEvents;
}

const Column = (props: ColumnProps) => {
  const { column } = props;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { columns } = useAppSelector((state: RootState) => state.columns);
  const { dragStartColumn, dragDropColumn, dragOverColumn } = props.columnDragEvents;
  const { dragStartTask, dragDropTask, dragOverTask, dragLeaveTask, dragEndTask } =
    props.taskDragEvents!;
  useEffect(() => {
    // dispatch(sortTask(column));
  }, [column]);
  const addTaskCard = async (text: string) => {
    const taskOrder = column.tasks.length === 0 ? 1 : column.tasks.length + 1;
    await dispatch(
      createOneTask({
        token: token,
        title: text,
        description: 'ddd',
        idBoard: currentBoard.id,
        idColumn: column.id,
        order: taskOrder,
        userId: 'fb8069a9-d592-43ed-b7e8-b60d0f27432f',
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    console.log(text);
  };

  return (
    <div
      className="column-item"
      draggable={true}
      onDragStart={(e) => dragStartColumn(e, column)}
      onDragLeave={(e) => dragLeaveTask(e)}
      onDragEnd={(e) => dragEndTask(e)}
      onDragOver={(e) => dragOverColumn(e)}
      onDrop={(e) => dragDropColumn(e, column)}
    >
      <div className="header-column">
        <input type="text" defaultValue={column.title || ''} />
      </div>
      <div className="task-container">
        {column.tasks.map((el) => (
          <Task
            taskDragEvents={{
              dragStartTask: dragStartTask,
              dragLeaveTask: dragLeaveTask,
              dragEndTask: dragEndTask,
              dragOverTask: dragOverTask,
              dragDropTask: dragDropTask,
            }}
            task={el}
            key={el.id}
          />
        ))}
      </div>
      <div className="footer-column">
        <BtnAddTask btnOnclick={addTaskCard} />
      </div>
    </div>
  );
};

export default Column;
