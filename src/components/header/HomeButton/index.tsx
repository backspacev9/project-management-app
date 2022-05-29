import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomeButton = () => {
  const { t } = useTranslation();
  return (
    <NavLink to="/main">
      <button className="home-btn"></button>
    </NavLink>
  );
};

export default HomeButton;
