import React, { useEffect } from 'react';
import Header from '../../components/header';
import { getBoards } from '../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import BoardsContainer from './components/boards-container';
import './index.css';

const MainPage = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards(token));
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <BoardsContainer />
    </>
  );
};

export default MainPage;
