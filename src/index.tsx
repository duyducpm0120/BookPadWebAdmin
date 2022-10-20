import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { MainApp } from '@core/contexts/MainApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <MainApp>
        <App />
      </MainApp>
    </CookiesProvider>
  </React.StrictMode>
);
