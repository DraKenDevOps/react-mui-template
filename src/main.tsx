import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './stores'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/app.css";
import { HelmetProvider } from 'react-helmet-async';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </React.StrictMode>
  </HelmetProvider>
);

