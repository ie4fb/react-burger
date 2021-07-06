import {
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  RESET_ORDER_DETAILS,
} from '../actions/order';

const initialState = {
  name: null,
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
};

export const orderReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
