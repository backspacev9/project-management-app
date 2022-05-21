import React from 'react';
import { useTranslation } from 'react-i18next';

export const LocaleSelect = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };
  return (
    <div className="local-select">
      <select name="locales" id="locales" onChange={(e) => changeLanguage(e)}>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
};
