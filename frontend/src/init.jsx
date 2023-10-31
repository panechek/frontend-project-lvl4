import React from 'react';
import Rollbar from 'rollbar';
import { Provider } from 'react-redux';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { AuthProvider } from './contexts/AuthContext.jsx';
import SocketProvider from './contexts/SocketContext.jsx';
import resources from './locales/index.js';
import App from './App.jsx';
import store from './redux/store.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: '30cdb5c70ff3421081d4d5f6f842e99f',
    environment: process.env.NODE_ENV,
  };
  const rollbar = new Rollbar(rollbarConfig);

  return (
    <RollbarProvider config={rollbar}>
      <ErrorBoundary>
        <React.StrictMode>
          <Provider store={store} socket={socket}>
            <I18nextProvider i18n={i18n} defaultNS="translation">
              <SocketProvider socket={socket}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </SocketProvider>
            </I18nextProvider>
          </Provider>
        </React.StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
