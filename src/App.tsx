import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Authorization from './pages/authorization';
import ErrorPage from './pages/error-page';
import MainPage from './pages/main-page';
import Registration from './pages/registration';
import WelcomePage from './pages/welcome-page';
import { getAllUsers, setToken } from './redux/auth-reducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { RootState } from './redux/store';
import Cookies from 'js-cookie';
import Board from './pages/board-page/Board';
import { Modal } from './components/Modal';
import { FormDeleteTask } from './pages/board-page/Task/components/form-delete';
import { FormUpdateTask } from './pages/board-page/Task/components/form-update';
import { FormCreateTask } from './pages/board-page/Task/components/form-create';

export enum modalActionEnum {
  updateTask = 'updateTask',
  deleteTask = 'deleteTask',
  createTask = 'createTask',
}

const App = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { isModalVisible, modalAction } = useAppSelector((state: RootState) => state.app);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(getAllUsers(token))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult) {
            dispatch(setToken(token));
          }
        })
        .catch(() => {
          Cookies.remove('token');
        });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={isAuth ? <MainPage /> : <Navigate replace to="/" />} />
          <Route
            path="/signin"
            element={isAuth ? <Navigate replace to="/main" /> : <Authorization />}
          />
          <Route
            path="/signup"
            element={isAuth ? <Navigate replace to="/main" /> : <Registration />}
          />
          <Route path="main/b/:id" element={<Board />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {isModalVisible && (
          <Modal>
            {modalAction === modalActionEnum.deleteTask ? (
              <FormDeleteTask />
            ) : modalAction === modalActionEnum.updateTask ? (
              <FormUpdateTask />
            ) : modalAction === modalActionEnum.createTask ? (
              <FormCreateTask />
            ) : (
              <div>error</div>
            )}
          </Modal>
        )}
      </Router>
    </div>
  );
};

export default App;
