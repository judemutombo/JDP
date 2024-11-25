import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/game/App';
import AppUser from './components/user/App_User';

const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById('root');

if (rootElement) {
  if (rootElement.dataset.page === 'game') {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else if (rootElement.dataset.page === 'user') {
    root.render(
      <React.StrictMode>
        <AppUser />
      </React.StrictMode>
    );
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
