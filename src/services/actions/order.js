import { sendOrderRequest } from '../burgerApi';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';
export const SET_ORDERS = 'SET_ORDERS';
export function placeOrder(data) {
  return function (dispatch) {
    dispatch({
      type: PLACE_ORDER,
    });
    sendOrderRequest(data)
      .then(res => {
        dispatch({
          type: RESET_ORDER_DETAILS,
        });
        if (res && res.success) {
          dispatch({
            type: PLACE_ORDER_SUCCESS,
            name: res.name,
            order: res.order.number,
          });
        } else {
          dispatch({
            type: PLACE_ORDER_FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_ORDER_DETAILS,
        });
        dispatch({
          type: PLACE_ORDER_FAILURE,
        });
      });
  };
}
