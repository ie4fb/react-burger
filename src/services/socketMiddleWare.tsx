import { RootState } from './reducers';
import { Middleware } from 'redux';

export type TWSActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsStop: string;
};

export const createSocketMiddleware = (
  wsActions: TWSActions,
): Middleware<{}, RootState> => {
  const socketMiddleware: Middleware<{}, RootState> = store => {
    let socket: WebSocket | null = null;
    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsStop, onMessage, onOpen, onClose, onError } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(action.url);
        console.log(action.url)
        if (socket) {
          socket.onopen = e => {
            dispatch({ type: onOpen, payload: e });
          };
        }
        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          dispatch({ type: onMessage, payload: data });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
        socket.onerror = e => {
          dispatch({ type: onError, payload: e });
        };
      }

      if (socket && type === wsStop) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
  return socketMiddleware;
};
