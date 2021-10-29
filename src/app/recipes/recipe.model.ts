export interface Recipe {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly preparationTimeInMinutes: number;
  readonly ingredients: readonly Ingredient[];
}

export interface Ingredient {
  readonly _id: string;
  readonly name: string;
  readonly quantity: string;
}
