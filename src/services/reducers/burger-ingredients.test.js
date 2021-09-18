import { ingredientsReducer } from './burger-ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../actions/burger-ingredients';

const initialState = {
  ingredients: { bun: [], sauce: [], main: [] },
  ingredientsRequest: false,
  ingredientsFailed: false,
};
describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  const ingredient = {
    name: 'test_ingredient',
    type: 'main',
    price: 1000,
    index: 0,
  };
  const anotherIngredient = {
    name: 'test_ingredient2',
    type: 'main',
    price: 1000,
    index: 0,
  };
  const sauce = { name: 'test_sauce', type: 'sauce', price: 1000, index: 0 };
  const bun = { name: 'test_ingredient', type: 'bun', price: 1000, index: 0 };

  it('should handle GET_INGREDIENTS', () => {
    expect(
      ingredientsReducer(
        { ingredientsRequest: false },
        {
          type: GET_INGREDIENTS,
        },
      ),
    ).toEqual({
      ingredientsRequest: true,
    });
  });
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(
        {
          ingredientsRequest: true,
          ingredientsFailed: false,
          ingredients: { bun: [], sauce: [], main: [] },
        },
        {
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: [ingredient, anotherIngredient, bun, sauce],
        },
      ),
    ).toEqual({
      ingredientsFailed: false,

      ingredients: {
        bun: [bun],
        sauce: [sauce],
        main: [ingredient, anotherIngredient],
      },
      ingredientsRequest: false,
    });
  });
  it('should handle GET_INGREDIENTS_FAILURE', () => {
    expect(
      ingredientsReducer(
        { ingredientsRequest: true, ingredientsFailed: false },
        {
          type: GET_INGREDIENTS_FAILURE,
        },
      ),
    ).toEqual({
      ingredientsFailed: true,
    //  ingredients: { bun: [], sauce: [], main: [] },
      ingredientsRequest: false,
    });
  });
});
