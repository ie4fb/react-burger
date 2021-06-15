import {
  ADD_TO_CART,
  SET_BUN,
  REMOVE_FROM_CART,
  UPDATE_ORDER_PRICE,
} from '../actions/burger-constructor';

const initialState = {
  currentBun: {},
  itemsList: [],
  totalPrice: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        itemsList: [...state.itemsList, action.item],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        itemsList: state.itemsList.filter(
          (item, index) => index !== action.index,
        ),
      };
    }
    case SET_BUN: {
      return {
        ...state,
        currentBun: action.item,
      };
    }
    case UPDATE_ORDER_PRICE: {
      let sum = 0;
      state.itemsList.forEach(item => {
        sum += parseInt(item.price);
      });
      return {
        ...state,
        totalPrice: state.currentBun.price + sum,
      };
    }
    default: {
      return { ...initialState };
    }
  }
};
