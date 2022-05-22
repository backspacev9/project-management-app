import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleSelect } from '../../components/header/LocalesSelect';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { handleVisibleModal } from '../../redux/tasks-reducer';
import { FormCreateTask } from './components/TaskModal/form-create';
import { Modal } from '../../components/Modal';

const TasksPage = () => {
  const { modalVisible } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showModal = () => {
    dispatch(handleVisibleModal(true));
  };

  const createForm = FormCreateTask();

  return (
    <>
      <button onClick={showModal}>{t('create_btn')}</button>
      {modalVisible && <Modal component={createForm}></Modal>}
    </>
  );
};

export default TasksPage;
