import { TWSFeedData } from '../../types/data';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_MESSAGE';
export const WS_CONNECTION_START = 'WS_CONNECTION_START';

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  data: TWSFeedData;
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWSActions =
  | IWSConnectionSuccess
  | IWSGetOrders
  | IWSConnectionError
  | IWSConnectionClosed;
