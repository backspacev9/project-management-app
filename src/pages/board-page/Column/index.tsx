import {
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import BtnAddTask from '../../../components/board/btn-addTask';
import { IColumnWithTasks } from '../../../utils/columns-type';
import Task from '../Task';
import './index.scss';

interface ColumnProps {
  column: IColumnWithTasks;
  providedDrag: DraggableProvided;
  providedDrop: DroppableProvided;
  snapshotDrop: DroppableStateSnapshot;
}

const Column = (props: ColumnProps) => {
  const { providedDrag, providedDrop } = props;
  const { id, title, tasks } = props.column;

  return (
    <div
      className="wrapper-column"
      ref={providedDrag.innerRef}
      {...providedDrag.draggableProps}
      {...providedDrag.dragHandleProps}
    >
      <div className="drop-column" ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
        <div className="column-item">
          <div className="header-column">
            <span>{title}</span>
          </div>

          <div className="task-container">
            {tasks && Object.keys(tasks).length !== 0
              ? tasks.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided, snapshotDragTask) => (
                      <Task task={el} key={el.id} provided={provided} />
                    )}
                  </Draggable>
                ))
              : ''}
            {providedDrop.placeholder}
          </div>

          <div className="footer-column">
            <BtnAddTask columnId={id} />
          </div>
        </div>
        {providedDrop.placeholder}
      </div>
    </div>
  );
};

export default Column;
