import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { handleVisibleModal } from '../../redux/app-reducer';
import './index.css';

export const Modal = ({ component }: { component: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(handleVisibleModal(false));
  };

  return (
    <div className="modal" data-testid="modal">
      <section className="modal-main">
        <button className="modal-close" onClick={hideModal}></button>
        <div className="modal-content">{component}</div>
      </section>
    </div>
  );
};
