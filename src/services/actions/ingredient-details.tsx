export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const RESET_INGREDIENT_DATA = 'RESET_INGREDIENT_DATA';

export interface IShowIngredientInfo {
  readonly type: typeof SHOW_INGREDIENT_INFO;
  readonly calories: number,
  readonly carbohydrates: number,
  readonly fat: number,
  readonly image_large: string,
  readonly name: string,
  readonly proteins: number,
}
export interface IResetIngredientData {
  readonly type: typeof RESET_INGREDIENT_DATA;
}

export type TIngredientDetailsActions =
  | IShowIngredientInfo
  | IResetIngredientData;
