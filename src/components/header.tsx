import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const Header = () => {
  const store = useAppSelector((state: RootState) => state);

  const handleShowStore = async () => {
    console.log(store);
  };

  return (
    <>
      <button onClick={handleShowStore}>Show Store</button>
    </>
  );
};

export default Header;
