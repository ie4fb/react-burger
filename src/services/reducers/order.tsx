import {
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  RESET_ORDER_DETAILS,
  SET_ORDERS,
} from '../actions/order';

import { TOrderActions } from '../actions/order';
import { TOrderItem } from '../../types/data';

type TOrderInitialState = {
  name: null | string;
  order: TOrderItem | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderSuccess: boolean;
  orders: Array<TOrderItem>;
};

const initialState: TOrderInitialState = {
  name: null,
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  orders: [],
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case PLACE_ORDER: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderSuccess: true,
        order: action.order,
        name: action.name,
      };
    }
    case PLACE_ORDER_FAILURE: {
      return {
        orderRequest: false,
        orderFailed: true,
        orderSuccess: false,
      };
    }
    case RESET_ORDER_DETAILS: {
      return {
        ...state,
        name: null,
        order: null,
        orderRequest: false,
        orderFailed: false,
        orderSuccess: false,
      };
    }
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    default: {
      return state;
    }
  }
};
