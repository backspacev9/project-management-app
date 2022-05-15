import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignIn } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { IUserInfo } from '../../utils/auth-types';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });

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
      </section>
    </>
  );
};

export default Authorization;
