import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientInfoReducer } from './ingredient-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  order: orderReducer,
  ingredientInfo: ingredientInfoReducer,
});
