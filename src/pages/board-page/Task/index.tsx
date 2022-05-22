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
  taskDragEvents: ITaskDragEvents;
}

const Task = (props: TaskProps) => {
  const { task } = props;
  const { dragStartTask, dragDropTask, dragOverTask, dragLeaveTask, dragEndTask } =
    props.taskDragEvents;

  return (
    <div
      className="task-item"
      draggable={true}
      onDragStart={(e) => dragStartTask(e, task)}
      onDragLeave={(e) => dragLeaveTask(e)}
      onDragEnd={(e) => dragEndTask(e)}
      onDragOver={(e) => dragOverTask(e)}
      onDrop={(e) => dragDropTask(e, task)}
    >
      {task.title}
    </div>
  );
};

export default Task;
