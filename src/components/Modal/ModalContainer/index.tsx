import React from 'react';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import './index.scss';

export const ModalContainer = ({ children }: { children: JSX.Element }) => {
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
