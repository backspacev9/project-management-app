import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { getAllUsers, setToken } from './redux/auth-reducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { RootState } from './redux/store';
import Cookies from 'js-cookie';
import {
  CreateBoard,
  FormCreateTask,
  FormDeleteTask,
  FormUpdateTask,
  Modal,
} from './components/Modal';
import { modalActionEnum } from './utils/enums';
import {
  WelcomePage,
  MainPage,
  Authorization,
  Registration,
  ErrorPage,
  Board,
  EditProfile,
} from './pages';

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
          <Route path="/edit-profile" element={<EditProfile />} />
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
            ) : modalAction === modalActionEnum.createBoard ? (
              <CreateBoard />
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
