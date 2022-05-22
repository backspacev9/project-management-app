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
import TasksPage from './pages/task';
import Board from './pages/board-page/Board';

const App = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

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
          <Route path="/task" element={<TasksPage />} />
          <Route path="main/b/:id" element={<Board />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
