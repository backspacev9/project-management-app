import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { modalActionEnum } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';

export const ViewTask = () => {
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const { title, description, files } = currentTask;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);

  const author = users.find((user) => user.id === currentTask.userId);
  const { t } = useTranslation();

  const handleClick = (modalAction: string) => {
    dispatch(setModalAction(modalAction));
  };

  return (
    <section>
      <p>{t('task_form.author')}</p>
      <p>{author?.name}</p>
      <p>{t('task_form.title')}</p>
      <p>{title}</p>
      <p>{t('task_form.descr')}</p>
      <p>{description}</p>
      <button onClick={() => handleClick(modalActionEnum.updateTask)}>{t('update_btn')}</button>
    </section>
  );
};
