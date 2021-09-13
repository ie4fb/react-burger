import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_CONNECTION_START,
  } from './actions/wsActions';
  import { RootState } from './reducers';
  import { Middleware } from "redux";

export type TWSActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_ORDERS,
}

export const createSocketMiddlware = (
    wsUrl: string,
    wsActions: TWSActions
  ): Middleware<{}, RootState> => {
    const socketMiddleware: Middleware<{}, RootState> = (store) => {
      let socket: WebSocket | null = null;
      return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const {
          wsInit,
          onOpen,
          onClose,
          onError,
          onMessage,
        } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(action.data);
          socket.onopen = (event) => {
            dispatch({ type: onOpen, data: event });
          };
          socket.onerror = (event) => {
            dispatch({ type: onError, data: event });
          };
          socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            dispatch({
              type: onMessage,
              data: {
                ...data,
              },
            });
          };
          socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
          };
        }
        if (onClose && type === onClose && socket) {
          socket.close();
          socket = null;
        }
        if (wsSendMessage && type === wsSendMessage && socket) {
          const message = {
            ...payload,
            token: getCookie("accessToken")?.replace("Bearer ", ""),
          };
          socket.send(JSON.stringify(message));
        }
        next(action);
      };
    };
    return socketMiddleware;
  };