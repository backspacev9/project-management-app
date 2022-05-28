import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchSignIn, fetchSignUp, setMessage } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { IUserInfo } from '../../utils/auth-types';
import './index.scss';
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });
  const { errorMessage } = useAppSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(setMessage(''));
    };
  }, [dispatch]);

  const onSubmit = (data: IUserInfo) => {
    const args = { login: data.login, password: data.password };
    dispatch(fetchSignUp(data)).then((res) => {
      if (res.meta.requestStatus !== 'rejected') dispatch(fetchSignIn(args));
    });
  };

  return (
    <>
      <section className="registration">
        <h3>{t('registration')}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder={t('name')}
            id="user-name"
            {...register('name', { required: true, pattern: /^[A-Za-zА-Яа-яЁё]+$/ })}
          />
          <div className="error-message">{errors.name && t('name_error')}</div>
          <input
            type="text"
            placeholder={t('login')}
            id="user-login"
            {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">{errors.login && t('login_error')}</div>
          <input
            type="password"
            placeholder={t('password')}
            id="user-password"
            {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">{errors.password && t('password_error')}</div>
          <button type="submit" className="registration-btn">
            {t('sign_Up')}
          </button>
        </form>
        <div>{errorMessage}</div>
        <div>
          <span>{t('registration_msg')}</span>
          <NavLink to="/signin">
            <span className="page-link">{t('to_autorization_page')}</span>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Registration;
