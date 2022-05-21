import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleSelect } from '../../components/header/LocalesSelect';
// import handleVisibleModal from '../../redux/tasks-reducer';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { handleVisibleModal } from '../../redux/tasks-reducer';
import { FormCreateTask } from './components/TaskModal/form-create';
// import { getAllTasks } from '../../redux/tasks-reducer';
import { Modal } from './components/TaskModal/task-modal';

const TasksPage = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { modalVisible } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showModal = () => {
    dispatch(handleVisibleModal(true));
  };

  useEffect(() => {
    // dispatch(getBoards(token));
    // dispatch(getAllTasks(token, boardId, columnId));
  }, [dispatch, token]);

  const createForm = FormCreateTask();

  return (
    <>
      <LocaleSelect />
      <button onClick={showModal}>{t('create_btn')}</button>
      {modalVisible && <Modal component={createForm}></Modal>}
    </>
  );
};

export default TasksPage;
