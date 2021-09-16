import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './reducers';
import { createSocketMiddleware } from './socketMiddleWare';
import thunkMiddleware from 'redux-thunk';


import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from './actions/wsActions';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};
const wsMiddleware = createSocketMiddleware(wsActions);

const enhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, wsMiddleware)
);

export const store = createStore(rootReducer, enhancer);
