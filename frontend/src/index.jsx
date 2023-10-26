import React from 'react';
import Rollbar from 'rollbar';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import i18n from './locales/index.js';
import App from './App.jsx';
import store from './redux/store.js';

const rollbarConfig = {
  accessToken: '30cdb5c70ff3421081d4d5f6f842e99f',
  environment: process.env.NODE_ENV,
};
const roolbal = new Rollbar(rollbarConfig);
// const Test = () => {
//   const a = null;
//   a.look();
// };
const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <React.StrictMode>
        <Provider store={store}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <App />
            {/* <Test /> */}
          </I18nextProvider>
        </Provider>
      </React.StrictMode>
    </ErrorBoundary>
   </RollbarProvider>,
);
