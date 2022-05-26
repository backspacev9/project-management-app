import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>404</div>
      <div>{t('page_404')}</div>
    </>
  );
};

export default ErrorPage;
