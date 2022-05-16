import { useEffect } from 'react';
import { createOneTask, getBoardByID, sortTask } from '../../../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import BtnAddTask from '../btn-addTask';
import { ColumnInteface, TaskInterface } from './interface';
import Task from './task-item';

interface ColumnProps {
  column: ColumnInteface;
}

const Column = (props: ColumnProps) => {
  const { column } = props;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);

  useEffect(() => {
    sortTask(column);
    console.log('sorting');
  }, [column]);
  const addTaskCard = async (text: string) => {
    const taskOrder = column.tasks.length === 0 ? 1 : column.tasks.length + 1;
    await dispatch(
      createOneTask({
        token: token,
        title: text,
        description: 'ddd',
        idBoard: currentBoard.id,
        idColumn: column.id,
        order: taskOrder,
        userId: 'fb8069a9-d592-43ed-b7e8-b60d0f27432f',
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    console.log(text);
  };
  return (
    <div className="column-item">
      <div className="header-column">
        <input type="text" defaultValue={column.title || ''} />
      </div>
      <div className="task-container">
        {column.tasks.map((el) => (
          <Task task={el} key={el.id} />
        ))}
      </div>
      <div className="footer-column">
        <BtnAddTask btnOnclick={addTaskCard} />
      </div>
    </div>
  );
};

export default Column;
