import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignIn, fetchSignUp } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { IUserInfo } from '../../utils/auth-types';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });
  const { errorMessage } = useAppSelector((state: RootState) => state.auth);

  const onSubmit = async (data: IUserInfo) => {
    const args = { login: data.login, password: data.password };
    dispatch(fetchSignUp(data)).then(() => {
      dispatch(fetchSignIn(args));
    });
  };

  return (
    <>
      <section className="registration">
        <h3>Registration: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            id="user-name"
            {...register('name', { required: true, pattern: /^[A-Za-zА-Яа-яЁё]+$/ })}
          />
          <div className="error-message">
            {errors.name && 'Please, enter valid name (only letters)'}
          </div>
          <input
            type="text"
            placeholder="Login"
            id="user-login"
            {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">
            {errors.login && 'Please, enter valid login (number or letters)'}
          </div>
          <input
            type="password"
            placeholder="Password"
            id="user-password"
            {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">
            {errors.password && 'Please, enter valid password (number or letters)'}
          </div>
          <button type="submit" className="registration-btn">
            Registration
          </button>
        </form>
        <div>{errorMessage}</div>
      </section>
    </>
  );
};

export default Registration;
