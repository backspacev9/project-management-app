import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignUp } from '../../../redux/auth-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { IUserInfo } from '../../../utils/auth-types';

const Registration = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IUserInfo>();

  const onSubmit = (data: IUserInfo) => {
    dispatch(fetchSignUp(data));
    reset();
  };

  return (
    <>
      <div className="auth">
        <h3>Registration: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" id="user-name" {...register('name')} />
          <input type="text" placeholder="Login" id="user-login" {...register('login')} />
          <input type="text" placeholder="Password" id="user-password" {...register('password')} />
          <button type="submit" className="registration-btn">
            Registration
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
