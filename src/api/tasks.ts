import axios from 'axios';
import { ITask } from '../utils/task-types';
import { BASE_URL } from './consts';

export const getTasks = async (
  token: string,
  boardId: string,
  columnId: string
): Promise<void | ITask[]> => {
  return axios
    .get(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<ITask[]> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};

export const getTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<void | ITask> => {
  return axios
    .get(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<ITask> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};

export const deleteTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<void> => {
  return axios
    .delete(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<void> => res.data)
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
  boardId: string,
  columnId: string,
  title: string,
  order: number,
  description: string,
  userId: string
): Promise<void | ITask> => {
  return axios
    .post(
      `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        order,
        description,
        userId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<ITask> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};

export const updateTask = async (
  token: string,
  boardId: string,
  columnId: string,
  title: string,
  order: number,
  description: string,
  userId: string
): Promise<void | ITask> => {
  return axios
    .put(
      `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<ITask> => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //TODO add error codes to enum
        console.log(error.response.message); //TODO open message on error page
      } else {
        throw new Error(error);
      }
    });
};
