import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { rootReducer } from './services/reducers';
// import { compose, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { store } from "./services/store";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
