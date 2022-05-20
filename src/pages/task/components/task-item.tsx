import React from 'react';
import { ITask } from '../../../utils/task-types';

interface IProps {
  task: ITask;
}

const Task: React.FC<IProps> = (props: IProps) => {
  const { task } = props;

  return (
    <div className="board-item">
      <div>{task.title}</div>
      <div>{task.id}</div>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default Task;
