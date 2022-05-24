import React, { useEffect } from 'react';
import { handleVisibleModal, setModalAction } from '../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getCurrentUser } from '../../redux/users-reducer';
import { modalActionEnum } from '../../utils/enums';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const { name, login, id } = useAppSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    dispatch(getCurrentUser({ token, id: userId }));
  }, [dispatch, token, userId]);

  const handleDelete = () => {
    dispatch(setModalAction(modalActionEnum.deleteUser));
    dispatch(handleVisibleModal(true));
  };

  return (
    <section>
      <h2>Edit Profile</h2>
      {/* <form>
        <input type="text" value={name} />
        <input type="text" value={login} />
        <input type="text" />
      </form> */}
      <button onClick={handleDelete}>Delete User</button>
    </section>
  );
};

export default EditProfile;
