import { TWSFeedData } from '../../types/data';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_MESSAGE';
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP';

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: TWSFeedData;
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
}

export interface IWSConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP;
}

export type TWSActions =
  | IWSConnectionSuccess
  | IWSGetOrders
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSConnectionStart
  | IWSConnectionStop;

  export const wsConnectionStart = (url: string): IWSConnectionStart => ({
    type: WS_CONNECTION_START,
    url,
  });
  
  export const wsConnectionStop = (): IWSConnectionStop => ({
    type: WS_CONNECTION_STOP,
  });
  
  export const wsConnectionSuccess = (): IWSConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
  });
  
  export const wsConnectionError = (): IWSConnectionError => ({
    type: WS_CONNECTION_ERROR,
  });
  
  export const wsConnectionClosed = (): IWSConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
  });
  
  export const wsGetMessage = (
    payload: TWSFeedData
  ): IWSGetOrders => {
    return {
      type: WS_GET_ORDERS,
      payload,
    };
  };