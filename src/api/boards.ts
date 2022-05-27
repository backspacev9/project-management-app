import axios from 'axios';
import { IBoard, IBoardWithColumns } from '../utils/board-types';

import { BASE_URL } from './consts';

export const getAllBoards = async (token: string): Promise<void | IBoard[]> => {
  return axios
    .get(`${BASE_URL}boards`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IBoard[]> => res.data);
};

export const getBoardById = async (
  token: string,
  id: string
): Promise<void | IBoardWithColumns> => {
  return axios
    .get(`${BASE_URL}boards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<IBoardWithColumns> => res.data);
};

export const createBoard = async (
  token: string,
  title: string,
  description: string
): Promise<void | IBoard> => {
  return axios
    .post(
      `${BASE_URL}boards`,
      { title: title, description: description },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IBoard> => res.data);
};
