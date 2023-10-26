import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.js';

const resources = { ru };

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
