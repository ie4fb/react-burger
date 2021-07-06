import { getBurgerIngredients } from '../burgerApi';

const GET_INGREDIENTS = 'GET_INGREDIENTS';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_METHODS_SUCCESS';
const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_METHODS_FAILURE';

export { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILURE};


export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS
      });
      getBurgerIngredients().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILURE
          });
        }
      })
      .catch((res) => {
        dispatch({
          type: GET_INGREDIENTS_FAILURE
        })
      })
    };
  }
  