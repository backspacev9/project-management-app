import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authorization from './pages/authorization';
import ErrorPage from './pages/error-page';
import MainPage from './pages/main-page';
import Registration from './pages/registration';
import WelcomePage from './pages/welcome-page';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signin" element={<Authorization />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
