import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/index.js';
import App from './App.jsx';
import store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
