import { useEffect, useState } from 'react';
import { getColumnById } from '../../../api/columns';
import BtnAddTask from '../../../components/board/btn-addTask';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { createOneTask } from '../../../redux/tasks-reducer';
import { IColumn, IColumnWithTasks } from '../../../utils/columns-type';

import Task, { ITaskDragEvents } from '../Task/task-item';
import './column-item.scss';
export interface IColumnDragEvents {
  dragStartColumn: (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => void;
  // dragLeaveColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  // dragEndColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragOverColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragDropColumn: (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => void;
}

interface ColumnProps {
  column: IColumn;
  columnDragEvents: IColumnDragEvents;
  taskDragEvents: ITaskDragEvents;
}

const Column = (props: ColumnProps) => {
  const { column } = props;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const { dragStartColumn, dragDropColumn, dragOverColumn } = props.columnDragEvents;
  const { dragStartTask, dragDropTask, dragOverTask, dragLeaveTask, dragEndTask } =
    props.taskDragEvents!;

  const [fullColumn, setFullColumn] = useState<IColumnWithTasks | void>(Object);
  const getColumn = async () => {
    if (column) {
      const res = await getColumnById(token, currentBoard.id, column.id);
      setFullColumn(res);
    }
  };
  useEffect(() => {
    getColumn();
  }, [column]);
  const addTaskCard = async (text: string) => {
    const taskOrder = fullColumn
      ? fullColumn.tasks.length === 0
        ? 1
        : fullColumn!.tasks.length + 1
      : 0;
    await dispatch(
      createOneTask({
        token: token,
        title: text,
        description: 'ddd',
        boardId: currentBoard.id,
        columnId: column.id,
        order: taskOrder,
        userId: 'fb8069a9-d592-43ed-b7e8-b60d0f27432f',
      })
    );
    getColumn();
  };

  return (
    <div
      className="column-item"
      draggable={true}
      onDragStart={(e) => dragStartColumn(e, fullColumn!)}
      onDragLeave={(e) => dragLeaveTask(e)}
      onDragEnd={(e) => dragEndTask(e)}
      onDragOver={(e) => dragOverColumn(e)}
      onDrop={(e) => dragDropColumn(e, fullColumn!)}
    >
      <div className="header-column">
        <input type="text" defaultValue={column.title || ''} />
      </div>
      <div className="task-container">
        {fullColumn && Object.keys(fullColumn).length !== 0
          ? fullColumn.tasks.map((el) => (
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
            ))
          : ''}
      </div>
      <div className="footer-column">
        <BtnAddTask btnOnclick={addTaskCard} />
      </div>
    </div>
  );
};

export default Column;
