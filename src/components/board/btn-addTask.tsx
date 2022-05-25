import { useTranslation } from 'react-i18next';
import { modalActionEnum } from '../../App';
import { FormCreateTask } from '../Modal/components/form-create';
import { handleVisibleModal, setModalAction } from '../../redux/app-reducer';
import { setCurrentColumnId } from '../../redux/columns-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

interface btnProps {
  columnId: string;
}

const BtnAddTask = ({ columnId }: btnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOnClick = () => {
    dispatch(setModalAction(modalActionEnum.createTask));
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(columnId));
  };

  return (
    <>
      <div className="addTask">
        <button className="btn-addTaskCard" onClick={handleOnClick}>
          {t('task_form.create_btn')}
        </button>
      </div>
    </>
  );
};

export default BtnAddTask;
