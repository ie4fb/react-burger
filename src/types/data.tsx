export type TIngredientItem = {
  readonly _id: string;
  readonly name: string;
  readonly type: 'bun' | 'sauce' | 'main';
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v?: 0;
};

export type TOrderItem = {
  readonly _id: string;
  readonly number: string;
  readonly createdAt: string;
  readonly name: string;
  readonly status: string;
  readonly price: number;
  readonly ingredients: ReadonlyArray<string>;
};
export type TWSFeedData = {
  orders: TOrderItem[];
  success: boolean;
  timestamp: number;
  total: number;
  totalToday: number;
};
