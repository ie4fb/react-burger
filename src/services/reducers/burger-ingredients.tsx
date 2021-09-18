import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../actions/burger-ingredients';
import { TIngredientItem } from '../../types/data';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';

type TBurgerIngredientsState = {
  ingredients: {
    bun: Array<TIngredientItem>;
    sauce: Array<TIngredientItem>;
    main: Array<TIngredientItem>;
  };
  ingredientsRequest: Boolean;
  ingredientsFailed: Boolean;
};

const initialState: TBurgerIngredientsState = {
  ingredients: { bun: [], sauce: [], main: [] },
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions,
) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: {
          bun: action.ingredients.filter(item => item.type === 'bun'),
          sauce: action.ingredients.filter(item => item.type === 'sauce'),
          main: action.ingredients.filter(item => item.type === 'main'),
        },
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILURE: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};
