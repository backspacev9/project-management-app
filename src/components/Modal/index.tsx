import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { handleVisibleModal } from '../../redux/tasks-reducer';
import './index.css';

export const Modal = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(handleVisibleModal(false));
  };

  return (
    <div className="modal">
      <section className="modal-main">
        <button className="modal-close" onClick={hideModal}></button>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};
