import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { modalActionEnum } from '../../../utils/enums';

export const ViewTask = () => {
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const { title, description, files } = currentTask;
  const dispatch = useAppDispatch();

  const handleClick = (modalAction: string) => {
    dispatch(setModalAction(modalAction));
  };

  return (
    <section>
      <p>{title}</p>
      <p>{description}</p>
      <ul>
        {files.map((file, i) => (
          <li key={i}>
            <span>{file.filename}</span>
            <button>download</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleClick(modalActionEnum.updateTask)}>Update</button>
    </section>
  );
};
