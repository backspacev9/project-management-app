import React from 'react';
import { useForm } from 'react-hook-form';
import { handleVisibleModal, setModalAction } from '../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { updateCurrentUser } from '../../redux/users-reducer';
import { IUserInfo } from '../../utils/auth-types';
import { modalActionEnum } from '../../utils/enums';

//TODO add get user by Id after auth
const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { name, login, id } = useAppSelector((state: RootState) => state.users.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({
    mode: 'onSubmit',
    defaultValues: {
      name: name,
      login: login,
      password: '',
    },
  });

  const handleDelete = () => {
    dispatch(setModalAction(modalActionEnum.deleteUser));
    dispatch(handleVisibleModal(true));
  };

  const onSubmit = (data: IUserInfo) => {
    const { name, login, password } = data;
    dispatch(updateCurrentUser({ token, id, name, login, password }));
  };

  return (
    <section>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          id="user-name"
          {...register('name', {
            required: true,
            value: name,
            pattern: /^[A-Za-zА-Яа-яЁё]+$/,
          })}
        />
        <div className="error-message">
          {errors.name && 'Please, enter valid name (only letters)'}
        </div>
        <input
          type="text"
          placeholder="Login"
          id="user-login"
          maxLength={22}
          {...register('login', {
            required: true,
            pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/,
          })}
        />
        <div className="error-message">
          {errors.login && 'Please, enter valid login (number or letters)'}
        </div>
        <input
          type="password"
          placeholder="Password"
          id="user-password"
          maxLength={22}
          {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
        />
        <div className="error-message">
          {errors.password && 'Please, enter valid password (number or letters)'}
        </div>
        <button type="submit" className="update-btn">
          Update Info
        </button>
      </form>
      <button onClick={handleDelete}>Delete User</button>
    </section>
  );
};

export default EditProfile;
