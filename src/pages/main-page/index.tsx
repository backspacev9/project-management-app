import React from 'react';
import Header from '../../components/header';
import BoardsContainer from './components/boards-container';
import './index.css';

const MainPage = () => {
  return (
    <>
      <Header />
      <BoardsContainer />
    </>
  );
};

export default MainPage;
