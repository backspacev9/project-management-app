import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignIn, setLogin } from '../redux/auth-reducer';
import { getBoards } from '../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { IUserInfo } from '../utils/auth-types';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { register, handleSubmit, reset } = useForm<IUserInfo>();

  const onSubmit = async (data: IUserInfo) => {
    dispatch(setLogin(data.login));
    await dispatch(fetchSignIn(data));
    reset();
  };

  useEffect(() => {
    if (token) dispatch(getBoards(token));
  }, [dispatch, token]);

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
