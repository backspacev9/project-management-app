import axios from 'axios';
import { IUsers } from '../utils/auth-types';
import { BASE_URL } from './consts';

export const getUsers = async (token: string): Promise<void | IUsers[]> => {
  return axios
    .get(`${BASE_URL}users`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IUsers[]> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
