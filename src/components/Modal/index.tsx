import { ModalContainer } from './ModalContainer';
import CreateBoard from './CreateBoard';
import { FormCreateTask } from './FormCreateTask';
import { FormDeleteTask } from './FormDeleteTask';
import { FormUpdateTask } from './FormUpdateTask';
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';
import { modalActionEnum } from '../../utils/enums';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export const Modal = () => {
  const { modalAction } = useAppSelector((state: RootState) => state.app);

  return (
    <ModalContainer>
      {modalAction === modalActionEnum.deleteTask ? (
        <FormDeleteTask />
      ) : modalAction === modalActionEnum.updateTask ? (
        <FormUpdateTask />
      ) : modalAction === modalActionEnum.createTask ? (
        <FormCreateTask />
      ) : modalAction === modalActionEnum.createBoard ? (
        <CreateBoard />
      ) : modalAction === modalActionEnum.deleteUser ? (
        <DeleteUser />
      ) : modalAction === modalActionEnum.updateUser ? (
        <UpdateUser />
      ) : (
        <div>error</div>
      )}
    </ModalContainer>
  );
};
