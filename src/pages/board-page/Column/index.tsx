import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BtnAddTask from '../../../components/board/btn-addTask';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { getBoardByID } from '../../../redux/boards-reducer';
import { setCurrentColumnId, updateOneColumn } from '../../../redux/columns-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { IColumnWithTasks } from '../../../utils/columns-type';
import { modalActionEnum } from '../../../utils/enums';
import Task from '../Task';
import './index.scss';

interface ColumnProps {
  column: IColumnWithTasks;
}

interface IUpdateColumn {
  colTitle: string;
}

const Column = (props: ColumnProps) => {
  const { id, title, order, tasks } = props.column;
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateColumn>({ mode: 'onSubmit' });
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = () => {
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(id));
    dispatch(setModalAction(modalActionEnum.deleteColumn));
  };

  const handleCancel = () => {
    setUpdateMode(false);
    reset();
  };

  const handleUpdateMode = () => {
    setUpdateMode(true);
  };

  const onSubmit = async (data: IUpdateColumn) => {
    const { colTitle } = data;
    await dispatch(
      updateOneColumn({
        token,
        title: colTitle,
        idBoard: currentBoard.id,
        idColumn: id,
        order,
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    setUpdateMode(false);
  };

  return (
    <div className="wrapper-column">
      <div className="column-item">
        <div className="header-column">
          {updateMode ? (
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                defaultValue={title}
                {...register('colTitle', {
                  required: 'Title cannot be empty',
                  minLength: { value: 2, message: "Title can't be less than 2 characters" },
                })}
              />
              <div className="message-container">
                {errors.colTitle && <div className="error-message">{errors.colTitle.message}</div>}
              </div>
              <br />
              <button className="col-submit" type="submit"></button>
              <button className="col-cancel" type="button" onClick={handleCancel}></button>
            </form>
          ) : (
            <>
              <div onClick={handleUpdateMode}>{title}</div>
              <button className="column-delete" onClick={handleDelete}></button>
            </>
          )}
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
