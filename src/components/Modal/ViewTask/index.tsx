import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { modalActionEnum } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';

export const ViewTask = () => {
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const { title, description } = currentTask;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);

  const author = users.find((user) => user.id === currentTask.userId);
  const { t } = useTranslation();

  const handleClick = (modalAction: string) => {
    dispatch(setModalAction(modalAction));
  };

  return (
    <section className="view-task">
      <p>
        <span className="task-field">{t('task_form.author') + ': '}</span>
        <span>{author?.name}</span>
      </p>
      <p>
        <span className="task-field">{t('task_form.title') + ': '}</span>
        <span>{title}</span>
      </p>
      <p>
        <span className="task-field">{t('task_form.descr') + ': '}</span>
        <span>{description}</span>
      </p>
      <button onClick={() => handleClick(modalActionEnum.updateTask)}>{t('update_btn')}</button>
    </section>
  );
};
