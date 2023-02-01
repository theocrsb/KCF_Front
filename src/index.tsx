import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//Import de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles.css';

import { ToastContextProvider } from './context/toast-context';
import { LoadingContextProvider } from './context/loading-spinner';
import { AuthContextProvider } from './context/Auth-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </ToastContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
