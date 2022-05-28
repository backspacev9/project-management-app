import React from 'react';
import { useForm } from 'react-hook-form';
import { handleVisibleModal, setModalAction } from '../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { updateCurrentUser } from '../../redux/users-reducer';
import { IUserInfo } from '../../utils/auth-types';
import { modalActionEnum } from '../../utils/enums';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      });
  };

  return (
    <section>
      <h2>{t('edit_profile')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={t('name')}
          id="user-name"
          {...register('name', {
            required: true,
            value: name,
            pattern: /^[A-Za-zА-Яа-яЁё]+$/,
          })}
        />
        <div className="error-message">{errors.name && t('name_error')}</div>
        <input
          type="text"
          placeholder={t('login')}
          id="user-login"
          maxLength={22}
          {...register('login', {
            required: true,
            pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/,
          })}
        />
        <div className="error-message">{errors.login && t('login_error')}</div>
        <input
          type="password"
          placeholder={t('password')}
          id="user-password"
          maxLength={22}
          {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
        />
        <div className="error-message">{errors.password && t('password_error')}</div>
        <button type="submit" className="update-btn">
          {t('update_info')}
        </button>
      </form>
      <button onClick={handleDelete}>{t('delete_user')}</button>
    </section>
  );
};

export default EditProfile;
