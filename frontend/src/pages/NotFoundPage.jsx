import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import pageErrorImg from '../assets/page_error.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={pageErrorImg} alt="Страница не найдена" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFoundPage.main')}</h1>
      <p className="text-muted">
        {t('notFoundPage.link1')}
        <Link to="/">
          {t('notFoundPage.link2')}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
