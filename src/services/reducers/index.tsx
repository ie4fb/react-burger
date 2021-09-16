import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientInfoReducer } from './ingredient-details';
import { userReducer} from './user';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  ingredientInfo: ingredientInfoReducer,
  user: userReducer,
  ws: wsReducer
});

export type RootState = ReturnType<typeof rootReducer>