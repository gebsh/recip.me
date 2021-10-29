export interface NewRecipe {
  readonly name: string;
  readonly description: string;
  readonly preparationTimeInMinutes: number;
  readonly ingredients: readonly Ingredient[];
}

export interface Recipe extends NewRecipe {
  readonly _id: string;
}

export interface NewIngredient {
  readonly name: string;
  readonly quantity: string;
}
export interface Ingredient extends NewIngredient {
  readonly _id: string;
}
