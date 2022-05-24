import { useTranslation } from 'react-i18next';
import { FormCreateTask } from '../../pages/task/components/TaskModal/form-create';
import { setCurrentColumnId } from '../../redux/columns-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { handleVisibleModal } from '../../redux/tasks-reducer';
import { Modal } from '../Modal';

interface btnProps {
  columnId: string;
}

const BtnAddTask = ({ columnId }: btnProps) => {
  const { modalVisible } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOnClick = () => {
    dispatch(handleVisibleModal(true));
    dispatch(setCurrentColumnId(columnId));
  };

  return (
    <>
      <div className="addTask">
        <button className="btn-addTaskCard" onClick={handleOnClick}>
          {t('create_btn')}
        </button>
      </div>
      {modalVisible && (
        <Modal>
          <FormCreateTask />
        </Modal>
      )}
    </>
  );
};

export default BtnAddTask;
