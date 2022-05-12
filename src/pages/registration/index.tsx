import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignIn, fetchSignUp } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { IUserInfo } from '../../utils/auth-types';

const Registration = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IUserInfo>();

  const onSubmit = async (data: IUserInfo) => {
    await dispatch(fetchSignUp(data));
    // const args = { login: data.login, password: data.password };
    // await dispatch(fetchSignIn(args));
    reset();
  };

  return (
    <>
      <section className="registration">
        <h3>Registration: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" id="user-name" {...register('name')} />
          <input type="text" placeholder="Login" id="user-login" {...register('login')} />
          <input
            type="password"
            placeholder="Password"
            id="user-password"
            {...register('password')}
          />
          <button type="submit" className="registration-btn">
            Registration
          </button>
        </form>
      </section>
    </>
  );
};

export default Registration;
