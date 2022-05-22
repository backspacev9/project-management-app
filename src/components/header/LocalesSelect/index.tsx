import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LocaleSelect = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('');

  const getValueStrFromLS = (name: string) => {
    const matches = localStorage.getItem(name);
    return matches ? matches : '';
  };

  useEffect(() => {
    setLang(getValueStrFromLS('i18nextLng'));
  }, []);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    setLang(getValueStrFromLS('i18nextLng'));
  };

  return (
    <div className="local-select">
      <select name="locales" id="locales" value={lang} onChange={(e) => changeLanguage(e)}>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
};
