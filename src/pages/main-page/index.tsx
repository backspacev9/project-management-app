import React from 'react';
import Authorization from '../../components/authorization';
import BoardCreation from '../../components/board-creation';
import BoardsContainer from '../../components/boards-container';
import Registration from '../../components/registration';

const MainPage = () => {
  return (
    <>
      <Authorization />
      <Registration />
      <BoardCreation />
      <BoardsContainer />
    </>
  );
};

export default MainPage;
