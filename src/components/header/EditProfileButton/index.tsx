import React from 'react';
import { NavLink } from 'react-router-dom';

const EditProfileButton = () => {
  return (
    <NavLink to="/edit-profile">
      <button>Edit profile</button>
    </NavLink>
  );
};

export default EditProfileButton;
