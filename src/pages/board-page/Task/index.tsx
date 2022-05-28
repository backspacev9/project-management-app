import { setModalAction } from '../../../redux/app-reducer';
import { setCurrentColumnId } from '../../../redux/columns-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentTask } from '../../../redux/tasks-reducer';
import { modalActionEnum } from '../../../utils/enums';
import { ITaskWithFiles } from '../../../utils/task-types';
import './index.scss';

interface TaskProps {
  task: ITaskWithFiles;
  columnId: string;
}

const Task = (props: TaskProps) => {
  const { task, columnId } = props;
  const dispatch = useAppDispatch();

  const handleClick = (modalAction: string) => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTask(task));
    dispatch(setModalAction(modalAction));
  };

  return (
    <div className="task-item">
      <div onClick={() => handleClick(modalActionEnum.viewTask)}>{task.title}</div>
      <button onClick={() => handleClick(modalActionEnum.deleteTask)}>delete</button>
    </div>
  );
};

export default Task;
