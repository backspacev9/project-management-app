import BtnAddTask from '../../../components/board/btn-addTask';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { setCurrentColumnId } from '../../../redux/columns-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { IColumnWithTasks } from '../../../utils/columns-type';
import { modalActionEnum } from '../../../utils/enums';
import Task from '../Task';
import './index.scss';

interface ColumnProps {
  column: IColumnWithTasks;
}

const Column = (props: ColumnProps) => {
  const { id, title, order, tasks } = props.column;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(id));
    dispatch(setModalAction(modalActionEnum.deleteColumn));
  };
  return (
    <div className="wrapper-column">
      <div className="column-item">
        <div className="header-column">
          <span>{title}</span>
          <button onClick={handleClick}>delete</button>
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
