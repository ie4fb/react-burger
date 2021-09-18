import { ingredientInfoReducer } from './ingredient-details';
import {
  SHOW_INGREDIENT_INFO,
  RESET_INGREDIENT_DATA,
} from '../actions/ingredient-details';

const initialState = {
  calories: null,
  carbohydrates: null,
  fat: null,
  image_large: null,
  name: null,
  proteins: null,
  isInfoRequested: false,
};
describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientInfoReducer(undefined, {})).toEqual(initialState);
  });

  const ingredient = {
    calories: 322,
    name: 'test_ingredient',
    carbohydrates: 22,
    fat: 22,
    image_large: 'some_string',
    proteins: 33,
    isInfoRequested: false,
  };

  it('should handle SHOW_INGREDIENT_INFO', () => {
    expect(
      ingredientInfoReducer(
        {
          calories: null,
          carbohydrates: null,
          fat: null,
          image_large: null,
          name: null,
          proteins: null,
          isInfoRequested: false,
        },
        {
          type: SHOW_INGREDIENT_INFO,
          calories: 322,
          name: 'test_ingredient',
          carbohydrates: 22,
          fat: 22,
          image_large: 'some_string',
          proteins: 33,
          isInfoRequested: true,
        },
      ),
    ).toEqual({
      calories: 322,
      name: 'test_ingredient',
      carbohydrates: 22,
      fat: 22,
      image_large: 'some_string',
      proteins: 33,
      isInfoRequested: true,
    });
  });
  it('should handle RESET_INGREDIENT_DATA', () => {
    expect(
      ingredientInfoReducer(
        {
          calories: 322,
          name: 'test_ingredient',
          carbohydrates: 22,
          fat: 22,
          image_large: 'some_string',
          proteins: 33,
          isInfoRequested: true,
        },
        {
          type: RESET_INGREDIENT_DATA,
        },
      ),
    ).toEqual({
      calories: null,
      carbohydrates: null,
      fat: null,
      image_large: null,
      name: null,
      proteins: null,
      isInfoRequested: false,
    });
  });
});
