import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchSignIn, setMessage } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { IUserInfo } from '../../utils/auth-types';
import './index.scss';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });

  useEffect(() => {
    return () => {
      dispatch(setMessage(''));
    };
  }, [dispatch]);

  const onSubmit = async (data: IUserInfo) => {
    dispatch(fetchSignIn(data));
  };

  return (
    <>
      <section className="auth">
        <h3>Authorization: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Login"
            id="user-login"
            maxLength={22}
            {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
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
          <button type="submit" className="registration-btn">
            Authorization
          </button>
        </form>
        <div>{errorMessage}</div>
        <div>
          <span>Do not have an account? Go to </span>
          <NavLink to="/signup">
            <span className="page-link">registration page.</span>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Authorization;
