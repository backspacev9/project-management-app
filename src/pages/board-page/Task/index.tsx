import { DraggableProvided } from 'react-beautiful-dnd';
import { ITaskWithFiles } from '../../../utils/task-types';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { setCurrentColumnId } from '../../../redux/columns-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentTask } from '../../../redux/tasks-reducer';
import { modalActionEnum } from '../../../utils/enums';
import './index.scss';

interface TaskProps {
  task: ITaskWithFiles;
  columnId: string;
  provided: DraggableProvided;
}

const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const handleClick = (modalAction: string) => {
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTask(task));
    dispatch(setModalAction(modalAction));
  };
  const { task, provided, columnId } = props;
  return (
    <div
      className="task-item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div onClick={() => handleClick(modalActionEnum.viewTask)}>{task.title}</div>
      <button onClick={() => handleClick(modalActionEnum.deleteTask)}>delete</button>
    </div>
  );
};

export default Task;
