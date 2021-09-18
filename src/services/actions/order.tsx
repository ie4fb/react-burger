import { sendOrderRequest, getOrders } from '../burgerApi';
import { TOrderItem } from '../../types/data';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';
export const SET_ORDERS = 'SET_ORDERS';
export const SHOW_ORDER_INFO = 'SHOW_ORDER_INFO';
export const RESET_ORDER_DATA = 'RESET_ORDER_DATA';
export const GET_ORDERS_FEED = 'GET_ORDERS_FEED';
export const GET_ORDERS_FEED_SUCCESS = 'GET_ORDERS_FEED_SUCCESS';
export const GET_ORDERS_FEED_FAILURE = 'GET_ORDERS_FEED_FAILURE';

export interface IPlaceOrder {
  readonly type: typeof PLACE_ORDER;
}

export interface ISetOrders {
  readonly type: typeof SET_ORDERS;
  readonly orders: ReadonlyArray<TOrderItem>;
}
export interface IResetOrderDetails {
  readonly type: typeof RESET_ORDER_DETAILS;
}

export interface IPlaceOrderSuccess {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly order: number;
  readonly name: string;
}

export interface IPlaceOrderFailed {
  readonly type: typeof PLACE_ORDER_FAILURE;
}
export interface IShowOrderInfo {
  readonly type: typeof SHOW_ORDER_INFO;
  readonly order: TOrderItem;
}
export interface IResetOrderData {
  readonly type: typeof RESET_ORDER_DATA;
}

export interface IGetOrdersFeed {
  readonly type: typeof GET_ORDERS_FEED;
}
export interface IGetOrdersFeedSuccess {
  readonly type: typeof GET_ORDERS_FEED_SUCCESS;
  readonly orders: {  orders: TOrderItem[];
    total: number;
    totalToday: number;}
}
export interface IGetOrdersFeedFailure {
  readonly type: typeof GET_ORDERS_FEED_FAILURE;
}

export type TOrderActions =
  | IPlaceOrder
  | IPlaceOrderSuccess
  | IPlaceOrderFailed
  | ISetOrders
  | IResetOrderDetails
  | IShowOrderInfo
  | IResetOrderData
  | IGetOrdersFeed
  | IGetOrdersFeedSuccess
  | IGetOrdersFeedFailure;

export const placeOrderAction = (): IPlaceOrder => ({
  type: PLACE_ORDER,
});
export const placeOrderSuccessAction = (
  name: string,
  order: number,
): IPlaceOrderSuccess => ({
  type: PLACE_ORDER_SUCCESS,
  order,
  name,
});

export const placeOrderFailedAction = (): IPlaceOrderFailed => ({
  type: PLACE_ORDER_FAILURE,
});

export const resetOrderDetailsAction = (): IResetOrderDetails => ({
  type: RESET_ORDER_DETAILS,
});

export const getOrderFeedAction = (): IGetOrdersFeed => ({
  type: GET_ORDERS_FEED,
});
export const getOrderFeedSuccessAction = (orders: {
  orders: TOrderItem[];
  total: number;
  totalToday: number;
}): IGetOrdersFeedSuccess => ({
  type: GET_ORDERS_FEED_SUCCESS,
  orders,
});

export const getOrderFeedFailureAction = (): IGetOrdersFeedFailure => ({
  type: GET_ORDERS_FEED_FAILURE,
});

export function placeOrder(data: string[]) {
  return function (dispatch: (arg: {}) => TOrderActions) {
    dispatch(placeOrderAction);
    sendOrderRequest(data)
      .then(res => {
        dispatch(resetOrderDetailsAction);
        if (res && res.success) {
          dispatch(placeOrderSuccessAction(res.name, res.order.number));
        } else {
          dispatch(placeOrderFailedAction);
        }
      })
      .catch(() => {
        dispatch(resetOrderDetailsAction);
        dispatch(placeOrderFailedAction);
      });
  };
}

export function getOrdersFeed() {
  return function (dispatch: (arg: {}) => TOrderActions) {
    dispatch(getOrderFeedAction);
    getOrders()
      .then(res => {
        if (res && res.success) {
          dispatch(getOrderFeedSuccessAction(res));
        } else {
          dispatch(getOrderFeedFailureAction);
        }
      })
      .catch(() => {
        dispatch(getOrderFeedFailureAction());
      });
  };
}
