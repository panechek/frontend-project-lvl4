import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.js';

const resources = { ru };

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
  });

export default i18n;
