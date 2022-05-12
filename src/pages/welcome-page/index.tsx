import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const WelcomePage = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <section>
        {!isAuth ? (
          <>
            <NavLink to="/signin">
              <button>Sign In</button>
            </NavLink>
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/">
            <button>Go to Main Page</button>
          </NavLink>
        )}
      </section>
      <section>
        <h1>About Us</h1>
      </section>
    </>
  );
};

export default WelcomePage;
