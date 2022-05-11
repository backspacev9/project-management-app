import React from 'react';
import Authorization from '../../components/authorization';
import BoardCreation from '../../components/board-creation';
import Registration from '../../components/registration';

const MainPage = () => {
  return (
    <>
      <Authorization />
      <Registration />
      <BoardCreation />
    </>
  );
};

export default MainPage;
