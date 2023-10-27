import React from 'react';
import Rollbar from 'rollbar';
import { Provider } from 'react-redux';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from './contexts/AuthContext.jsx';
import SocketProvider from './contexts/SocketContext.jsx';
import i18n from './locales/index.js';
import App from './App.jsx';
import store from './redux/store.js';

const init = async (socket) => {
  const rollbarConfig = {
    accessToken: '30cdb5c70ff3421081d4d5f6f842e99f',
    environment: process.env.NODE_ENV,
  };
  const roolbal = new Rollbar(rollbarConfig);

  return (
    <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <React.StrictMode>
        <Provider store={store} socket={socket}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
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
