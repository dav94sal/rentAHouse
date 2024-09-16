import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ModalProvider, Modal } from './context/Modal';
import { restoreCSRF, csrfFetch } from './store/csrf';
import SessionProvider from './context/sessionContext';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots'
import * as reviewActions from './store/reviews'
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotActions = spotActions;
  window.reviewActions = reviewActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
          <Modal />
        </Provider>
      </ModalProvider>
    </SessionProvider>
  </React.StrictMode>
);
