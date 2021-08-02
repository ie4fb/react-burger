import { TIngredientItem } from '../../types/data';

export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_BUN = 'SET_BUN';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_ORDER_PRICE = 'UPDATE_ORDER_PRICE';
export const UPDATE_CART_ITEMS_ORDER = 'UPDATE_CART_ITEMS_ORDER';

export interface IAddToCart {
  readonly type: typeof ADD_TO_CART;
  readonly item: TIngredientItem;
}
export interface ISetBun {
  readonly type: typeof SET_BUN;
  readonly item: TIngredientItem;
}
export interface IRemoveFromCart {
  readonly type: typeof REMOVE_FROM_CART;
  readonly index: number;
}
export interface IUpdateOrderPrice {
  readonly type: typeof UPDATE_ORDER_PRICE;
}
export interface IUpdateCartOrder {
  readonly type: typeof UPDATE_CART_ITEMS_ORDER;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TBurgerConstructorActions =
  | IAddToCart
  | ISetBun
  | IRemoveFromCart
  | IUpdateOrderPrice
  | IUpdateCartOrder;
