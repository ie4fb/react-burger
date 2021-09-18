import { getBurgerIngredients } from '../burgerApi';
import { TIngredientItem } from '../../types/data';

const GET_INGREDIENTS = 'GET_INGREDIENTS';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_METHODS_SUCCESS';
const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_METHODS_FAILURE';

export { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILURE };

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredientItem>;
}
export interface IGetIngredientsFailure {
  readonly type: typeof GET_INGREDIENTS_FAILURE;
}
export type TBurgerIngredientsActions =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsFailure;

export const getIngredientsAction = (): IGetIngredients => ({
  type: GET_INGREDIENTS,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailure => ({
  type: GET_INGREDIENTS_FAILURE,
});

export const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<TIngredientItem>,
): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredients = () => {
  return function (dispatch: (arg: {}) => TBurgerIngredientsActions) {
    dispatch(getIngredientsAction);
    getBurgerIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsSuccessAction(res.data));
        } else {
          dispatch(getIngredientsFailedAction());
        }
      })
      .catch(res => {
        dispatch(getIngredientsFailedAction());
      });
  };
};
