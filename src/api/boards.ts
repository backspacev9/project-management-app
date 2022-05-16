import axios from 'axios';
import { BoardInteface } from '../pages/board-page/components/Board/interface';
import { IApiColumn, IApiTask, IBoard } from '../utils/board-types';
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

export const getBoardById = async (token: string, id: string): Promise<void | BoardInteface> => {
  return axios
    .get(`${BASE_URL}boards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<BoardInteface> => res.data)
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
export const createColumn = async (
  token: string,
  title: string,
  idBoard: string,
  order: number
): Promise<void | IApiColumn> => {
  return axios
    .post(
      `${BASE_URL}boards/${idBoard}/columns`,
      { title: title, order: order },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IApiColumn> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
export const createTask = async (
  token: string,
  title: string,
  description: string,
  idBoard: string,
  idColumn: string,
  order: number,
  userId: string
): Promise<void | IApiColumn> => {
  return axios
    .post(
      `${BASE_URL}boards/${idBoard}/columns/${idColumn}/tasks`,
      { title: title, order: order, description: description, userId: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IApiTask> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
