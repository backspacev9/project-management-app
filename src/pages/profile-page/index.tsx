import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal, setErrorMessage, setModalAction } from '../../redux/app-reducer';
import { setToken } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getCurrentUser, updateCurrentUser } from '../../redux/users-reducer';
import { IUserInfo } from '../../utils/auth-types';
import { modalActionEnum } from '../../utils/enums';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
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

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser({ token, id: userId }));
    } else {
      const token = Cookies.get('token');
      if (token) {
        Promise.all([dispatch(setToken(token)), getCurrentUser({ token, id: userId })]);
      } else navigation('/');
    }
  }, [dispatch, navigation, token, userId]);

  const handleDelete = () => {
    dispatch(setModalAction(modalActionEnum.deleteUser));
    dispatch(handleVisibleModal(true));
  };

  const onSubmit = (data: IUserInfo) => {
    const { name, login, password } = data;
    dispatch(updateCurrentUser({ token, id, name, login, password }))
      .unwrap()
      .then((result) => {
        if (result) {
          dispatch(setModalAction(modalActionEnum.updateUser));
          dispatch(handleVisibleModal(true));
        }
      })
      .catch((err) => {
        dispatch(setErrorMessage(err.message));
        dispatch(setModalAction(modalActionEnum.error));
        dispatch(handleVisibleModal(true));
      });
  };

  return (
    <section>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          id="user-name"
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
