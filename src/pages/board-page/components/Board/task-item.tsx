import { TaskInterface } from './interface';

interface TaskProps {
  task: TaskInterface;
}

const Task = (props: TaskProps) => {
  const { task } = props;
  return (
    <div draggable={true} className="task-item">
      {task.title}
    </div>
  );
};

export default Task;
