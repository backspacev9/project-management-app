import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import './index.scss';

const WelcomePage = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <main className="welcome">
      <section className="buttons-container">
        {!isAuth ? (
          <>
            <NavLink to="/signin">
              <button className="button">{t('sign_In')}</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="button">{t('sign_Up')}</button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/main">
            <button className="button">{t('go_to_mainPage')}</button>
          </NavLink>
        )}
      </section>
      <section className="about-container">
        <h1>{t('about_us')}</h1>
      </section>
    </main>
  );
};

export default WelcomePage;
