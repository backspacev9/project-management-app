import axios from 'axios';
import { IBoard, IBoardWithColumns } from '../utils/board-types';

import { BASE_URL } from './consts';

export const getAllBoards = async (token: string): Promise<void | IBoard[]> => {
  return axios
    .get(`${BASE_URL}boards`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IBoard[]> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};

export const getBoardById = async (
  token: string,
  id: string
): Promise<void | IBoardWithColumns> => {
  return axios
    .get(`${BASE_URL}boards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<IBoardWithColumns> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};

export const createBoard = async (token: string, title: string): Promise<void | IBoard> => {
  return axios
    .post(`${BASE_URL}boards`, { title: title }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IBoard> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
