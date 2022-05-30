import { useState } from 'react';
import './index.scss';

const MenuButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`btn-menu ${isActive ? 'menuActive' : ''}`}
      onClick={() => setIsActive((state) => !state)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuButton;
