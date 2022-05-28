import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <>
      <section>
        {!isAuth ? (
          <>
            <NavLink to="/signin">
              <button>{t('sign_In')}</button>
            </NavLink>
            <NavLink to="/signup">
              <button>{t('sign_Up')}</button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/main">
            <button>{t('go_to_mainPage')}</button>
          </NavLink>
        )}
      </section>
      <section>
        <h1>{t('about_us')}</h1>
      </section>
    </>
  );
};

export default WelcomePage;
