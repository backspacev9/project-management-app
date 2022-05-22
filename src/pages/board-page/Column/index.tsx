import { useEffect, useState } from 'react';
import { getColumnById } from '../../../api/columns';
import BtnAddTask from '../../../components/board/btn-addTask';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { createOneTask } from '../../../redux/tasks-reducer';
import { IColumn, IColumnWithTasks } from '../../../utils/columns-type';
import Task, { ITaskDragEvents } from '../Task';
import './index.scss';
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
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  // const { columns } = useAppSelector((state: RootState) => state.columns);
  const { dragStartColumn, dragDropColumn, dragOverColumn } = props.columnDragEvents;
  const { dragStartTask, dragDropTask, dragOverTask, dragLeaveTask, dragEndTask } =
    props.taskDragEvents!;

  const [fullColumn, setFullColumn] = useState<IColumnWithTasks>(Object);
  const getColumn = async () => {
    const res = await getColumnById(token, currentBoard.id, column.id);
    setFullColumn(res!);
  };

  useEffect(() => {
    getColumn();
  }, [column]);

  const addTaskCard = async (text: string) => {
    await dispatch(
      createOneTask({
        token: token,
        title: text,
        description: 'ddd',
        boardId: currentBoard.id,
        columnId: column.id,
        userId: userId,
      })
    );
    getColumn();
  };

  return (
    <div
      className="wrapper-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => dragDropColumn(e, fullColumn!)}
    >
      <div
        className="column-item"
        draggable={true}
        onDragStart={(e) => dragStartColumn(e, fullColumn!)}
        // onDragLeave={(e) => dragLeaveColumn(e)}
        // onDragEnd={(e) => dragEndColumn(e)}
        onDragOver={(e) => dragOverColumn(e)}
        //onDrop={(e) => dragDropColumn(e, fullColumn!)}
      >
        <div className="header-column">
          <span>{column.title}</span>
          {/* <input type="text" defaultValue={column.title || ''} /> */}
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
    </div>
  );
};

export default Column;
