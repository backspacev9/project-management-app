import axios from 'axios';
import { IColumn } from '../utils/board-types';
import { BASE_URL } from './consts';

export const getAllColumns = async (
  token: string,
  idBoard: string
): Promise<void | Array<IColumn>> => {
  return axios
    .get(`${BASE_URL}boards/${idBoard}/columns`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<Array<IColumn>> => res.data)
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
): Promise<void | IColumn> => {
  return axios
    .post(
      `${BASE_URL}boards/${idBoard}/columns`,
      { title: title, order: order },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IColumn> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
export const updateColumn = async (
  token: string,
  title: string,
  idBoard: string,
  idColumn: string,
  order: number
): Promise<void | IColumn> => {
  return axios
    .put(
      `${BASE_URL}boards/${idBoard}/columns/${idColumn}`,
      { title: title, order: order },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IColumn> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
