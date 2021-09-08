import { sendOrderRequest } from '../burgerApi';
import { TOrderItem } from '../../types/data';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';
export const SET_ORDERS = 'SET_ORDERS';

export interface IPlaceOrder {
  readonly type: typeof PLACE_ORDER;
}

export interface ISetOrders {
  readonly type: typeof SET_ORDERS;
  readonly orders: ReadonlyArray<TOrderItem>
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

export type TOrderActions =
  | IPlaceOrder
  | IPlaceOrderSuccess
  | IPlaceOrderFailed
  | ISetOrders
  | IResetOrderDetails;

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

export function placeOrder(data: string[]) {
  return function (dispatch: any) {
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
