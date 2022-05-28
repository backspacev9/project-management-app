import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { ITaskWithFiles } from '../../../utils/task-types';

interface TaskProps {
  task: ITaskWithFiles;
  provided: DraggableProvided;
}

const Task = (props: TaskProps) => {
  const { task, provided } = props;
  return (
    <div
      className="task-item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {task.title}
      <br />
      <button>Update</button>
      <button>delete</button>
    </div>
  );
};

export default Task;
