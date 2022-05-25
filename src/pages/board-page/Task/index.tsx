import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { setCurrentColumnId } from '../../../redux/columns-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentTask } from '../../../redux/tasks-reducer';
import { modalActionEnum } from '../../../utils/enums';
import { ITaskWithFiles } from '../../../utils/task-types';

interface TaskProps {
  task: ITaskWithFiles;
  columnId: string;
}

const Task = (props: TaskProps) => {
  const { task, columnId } = props;
  const dispatch = useAppDispatch();

  const handleClick = (modalAction: string) => {
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTask(task));
    dispatch(setModalAction(modalAction));
  };

  return (
    <>
      <div className="task-item">
        {task.title}
        <br />
        <button onClick={() => handleClick(modalActionEnum.updateTask)}>Update</button>
        <button onClick={() => handleClick(modalActionEnum.deleteTask)}>delete</button>
      </div>
    </>
  );
};

export default Task;
