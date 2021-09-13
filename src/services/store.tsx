import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { createSocketMiddlware } from './socketMiddleWare';
import thunkMiddleware from 'redux-thunk';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from './actions/wsActions';

const wsUrl = 'wss://norma.nomoreparties.space/chat';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware)),
  );
