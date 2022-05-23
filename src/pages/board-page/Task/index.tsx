import { ITaskWithFiles } from '../../../utils/task-types';

export interface ITaskDragEvents {
  dragStartTask: (ev: React.DragEvent<HTMLDivElement>, task: ITaskWithFiles) => void;
  dragLeaveTask: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragEndTask: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragOverTask: (ev: React.DragEvent<HTMLDivElement>) => void;
  dragDropTask: (ev: React.DragEvent<HTMLDivElement>, task: ITaskWithFiles) => void;
}

interface TaskProps {
  task: ITaskWithFiles;
}

const Task = (props: TaskProps) => {
  const { task } = props;
  return (
    <div className="task-item">
      {task.title}
      <br />
      <button>Update</button>
      <button>delete</button>
    </div>
  );
};

export default Task;
