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

export const ingredientInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_INFO: {
      return {
        ...state,
        calories: action.calories,
        carbohydrates: action.calories,
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
