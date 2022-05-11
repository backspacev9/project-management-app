import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignIn } from '../redux/auth-reducer';
import { useAppDispatch } from '../redux/hooks';
import { IUserInfo } from '../utils/auth-types';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IUserInfo>();

  const onSubmit = (data: IUserInfo) => {
    dispatch(fetchSignIn(data));
  };

  return (
    <>
      <div className="auth">
        <h3>Authorization: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Login" id="user-login" {...register('login')} />
          <input type="text" placeholder="Password" id="user-password" {...register('password')} />
          <button type="submit" className="registration-btn">
            Authorization
          </button>
        </form>
      </div>
    </>
  );
};

export default Authorization;
