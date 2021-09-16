import { constructorReducer } from "./burger-constructor";
import {
    ADD_TO_CART,
    SET_BUN,
    REMOVE_FROM_CART,
    UPDATE_ORDER_PRICE,
    UPDATE_CART_ITEMS_ORDER,
  } from '../actions/burger-constructor';

const initialState = {
    currentBun: {
        _id: '',
        name: '',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
      },
      itemsList: [],
      totalPrice: 0,
}
describe("ingredients reducer", () => {
    it("should return the initial state", () => {
      expect(constructorReducer(undefined, {})).toEqual(initialState);
    });
  
    const ingredient = { name: "test_ingredient", type: "main", price: 1000, index: 0 };
    const anotherIngredient = { name: "test_ingredient2", type: "main", price: 1000, index: 0 };
    const bun = { name: "test_ingredient", type: "bun", price: 1000, index: 0 };

  
    it("should handle ADD_TO_CART", () => {
      expect(
        constructorReducer(
          { itemsList: []},
          {
            type: ADD_TO_CART,
            item: ingredient
          }
        )
      ).toEqual({
        itemsList: [ingredient],
      });
    });
    it("should handle REMOVE_FROM_CART", () => {
        expect(
          constructorReducer(
            { itemsList: [ingredient]},
            {
              type: REMOVE_FROM_CART,
              index: ingredient.index
            }
          )
        ).toEqual({
          itemsList: [],
        });
      });
      it("should handle SET_BUN", () => {
        expect(
          constructorReducer(
            { currentBun: null},
            {
              type: SET_BUN,
              item: bun
            }
          )
        ).toEqual({
          currentBun: bun,
        });
      });
      it("should handle UPDATE_ORDER_PRICE", () => {
        expect(
          constructorReducer(
            { itemsList: [ingredient], totalPrice: 0, currentBun: bun},
            {
              type: UPDATE_ORDER_PRICE,
            }
          )
        ).toEqual({
          totalPrice: 2000, 
          itemsList: [ingredient],
          currentBun: bun
        });
      });
      it("should handle UPDATE_CART_ITEMS_ORDER", () => {
        expect(
          constructorReducer(
            { itemsList: [ingredient, anotherIngredient]},
            {
              type: UPDATE_CART_ITEMS_ORDER,
              hoverIndex: 1,
              dragIndex: 0
            }
          )
        ).toEqual({
         itemsList: [anotherIngredient, ingredient]
        });
      });
  });
  