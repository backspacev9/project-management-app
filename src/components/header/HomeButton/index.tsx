import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const HomeButton = () => {
  const location = useLocation();
  return (
    <NavLink to={location.pathname.includes('/main/b/') ? '/main' : '/'}>
      <button className="home-btn"></button>
    </NavLink>
  );
};

export default HomeButton;
