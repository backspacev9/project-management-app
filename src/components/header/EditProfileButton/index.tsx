import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditProfileButton = () => {
  const { t } = useTranslation();
  return (
    <NavLink to="/edit-profile">
      <button className="editProfile-btn">
        <img src="../../../../img/user.svg" alt={t('create_board')} />
        {t('user.update_btn')}
      </button>
    </NavLink>
  );
};

export default EditProfileButton;
