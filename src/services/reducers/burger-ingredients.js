import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../actions/burger-ingredients';

const initialState = {
  ingredients: { buns: [], sauces: [], main: [] },
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
          buns: action.ingredients.filter(item => item.type === 'bun'),
          sauces: action.ingredients.filter(item => item.type === 'sauce'),
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
