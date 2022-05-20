import React, { useEffect } from 'react';
// import handleVisibleModal from '../../redux/tasks-reducer';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { handleVisibleModal } from '../../redux/tasks-reducer';
// import { getAllTasks } from '../../redux/tasks-reducer';
import { Modal } from './components/TaskModal/task-modal';

const TasksPage = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { modalVisible } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(handleVisibleModal(true));
  };
  // const hideModal = () => {
  //   setShow(false);
  // };

  useEffect(() => {
    // dispatch(getBoards(token));
    // dispatch(getAllTasks(token, boardId, columnId));
  }, [dispatch, token]);

  return (
    <>
      <button onClick={showModal}>Create task</button>
      {modalVisible && <Modal></Modal>}
    </>
  );
};

export default TasksPage;
