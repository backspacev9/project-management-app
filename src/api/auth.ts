import axios from 'axios';
import { IToken, IUserInfo } from '../utils/auth-types';
import { BASE_URL } from './consts';

export const signUp = async (
  userName: string,
  userLogin: string,
  userPassword: string
): Promise<void | IUserInfo> => {
  return axios
    .post(`${BASE_URL}signup`, {
      name: userName,
      login: userLogin,
      password: userPassword,
    })
    .then((res): Promise<IUserInfo> => res.data);
};

export const signIn = async (userLogin: string, userPassword: string): Promise<void | IToken> => {
  return axios
    .post(`${BASE_URL}signin`, {
      login: userLogin,
      password: userPassword,
    })
    .then((res): Promise<IToken> => res.data);
};
