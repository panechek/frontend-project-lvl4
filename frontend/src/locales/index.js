import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.js';
import en from './en.js';

const resources = { ru, en };

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
