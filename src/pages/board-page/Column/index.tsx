import BtnAddTask from '../../../components/board/btn-addTask';
import { IColumnWithTasks } from '../../../utils/columns-type';
import Task from '../Task';
import './index.scss';

interface ColumnProps {
  column: IColumnWithTasks;
}

const Column = (props: ColumnProps) => {
  const { id, title, order, tasks } = props.column;

  return (
    <div className="wrapper-column">
      <div className="column-item">
        <div className="header-column">
          <span>{title}</span>
          {/* <input type="text" defaultValue={column.title || ''} /> */}
        </div>
        <div className="task-container">
          {tasks && Object.keys(tasks).length !== 0
            ? tasks.map((el) => <Task task={el} columnId={id} key={el.id} />)
            : ''}
        </div>
        <div className="footer-column">
          <BtnAddTask columnId={id} />
        </div>
      </div>
    </div>
  );
};

export default Column;
