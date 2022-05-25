import axios from 'axios';
import { BASE_URL } from './consts';

export const uploadFile = async (token: string, taskId: string, file: File): Promise<void> => {
  return axios
    .post(
      `${BASE_URL}file`,
      {
        taskId,
        file,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<void> => res.data);
};

export const getFile = async (token: string, taskId: string, fileName: string): Promise<void> => {
  return axios
    .get(`${BASE_URL}file/${taskId}/${fileName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<void> => res.data);
};
