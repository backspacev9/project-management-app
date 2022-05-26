import { DraggableProvided } from 'react-beautiful-dnd';
import BtnAddTask from '../../../components/board/btn-addTask';
import { IColumnWithTasks } from '../../../utils/columns-type';
import Task from '../Task';
import './index.scss';
export interface IColumnDragEvents {
  dragStartColumn: (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => void;
  // dragLeaveColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  // dragEndColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragOverColumn: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragDropColumn: (ev: React.DragEvent<HTMLDivElement>, column: IColumnWithTasks) => void;
}

interface ColumnProps {
  column: IColumnWithTasks;
  provided: DraggableProvided;
}

const Column = (props: ColumnProps) => {
  const { provided } = props;
  const { id, title, order, tasks } = props.column;

  return (
    <div
      className="wrapper-column"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="column-item">
        <div className="header-column">
          <span>{title}</span>
          {/* <input type="text" defaultValue={column.title || ''} /> */}
        </div>
        <div className="task-container">
          {tasks && Object.keys(tasks).length !== 0
            ? tasks.map((el) => <Task task={el} key={el.id} />)
            : ''}
        </div>
        <div className="footer-column">
          <BtnAddTask columnId={id} />
        </div>
      </div>
    </div>
  );
};

export default Column;
