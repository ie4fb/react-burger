import {
  SHOW_INGREDIENT_INFO,
  RESET_INGREDIENT_DATA,
} from '../actions/ingredient-details';

import { TIngredientDetailsActions } from '../actions/ingredient-details';

type TIngredientDetailsState = {
  calories: number | null;
  carbohydrates: number |null;
  fat: number |null;
  image_large: string | null;
  name: string | null;
  proteins: number |null;
  isInfoRequested: boolean;
};

const initialState: TIngredientDetailsState = {
  calories: null,
  carbohydrates: null,
  fat: null,
  image_large: null,
  name: null,
  proteins: null,
  isInfoRequested: false,
};

export const ingredientInfoReducer = (
  state = initialState,
  action: TIngredientDetailsActions,
) => {
  switch (action.type) {
    case SHOW_INGREDIENT_INFO: {
      return {
        ...state,
        calories: action.calories,
        carbohydrates: action.carbohydrates,
        fat: action.fat,
        image_large: action.image_large,
        name: action.name,
        proteins: action.proteins,
        isInfoRequested: true,
      };
    }
    case RESET_INGREDIENT_DATA: {
      return {
        calories: null,
        carbohydrates: null,
        fat: null,
        image_large: null,
        name: null,
        proteins: null,
        isInfoRequested: false,
      };
    }
    default: {
      return state;
    }
  }
};
