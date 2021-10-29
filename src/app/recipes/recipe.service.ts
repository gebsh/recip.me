import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NewRecipe, Recipe } from './recipe.model';

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

// TODO: Move this to an API.
const recipes: Writable<Recipe>[] = [
  {
    _id: '1',
    name: 'Autumn Cheesecake',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preparationTimeInMinutes: 4 * 60,
    ingredients: [
      { _id: '65', name: 'Eggs', quantity: '2' },
      { _id: '66', name: 'White sugar', quantity: '3 tablespoons' },
      { _id: '67', name: 'Vanilla extract', quantity: '½ teaspoon' },
    ],
  },
  {
    _id: '2',
    name: 'Autumn Cheesecake 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preparationTimeInMinutes: 3 * 60,
    ingredients: [
      { _id: '65', name: 'Eggs', quantity: '2' },
      { _id: '66', name: 'White sugar', quantity: '3 tablespoons' },
      { _id: '67', name: 'Vanilla extract', quantity: '½ teaspoon' },
    ],
  },
  {
    _id: '3',
    name: 'Autumn Cheesecake 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preparationTimeInMinutes: 3.5 * 60,
    ingredients: [
      { _id: '65', name: 'Eggs', quantity: '2' },
      { _id: '66', name: 'White sugar', quantity: '3 tablespoons' },
      { _id: '67', name: 'Vanilla extract', quantity: '½ teaspoon' },
    ],
  },
];
let nextId = 4;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public getRecipes(): Observable<readonly Recipe[]> {
    return of(clone(recipes));
  }

  public getRecipe(id: string): Observable<Recipe> {
    const recipe = recipes.find(({ _id }) => _id === id);

    if (recipe) {
      return of(clone(recipe)).pipe(delay(1000));
    }

    return throwError(new Error(`Recipe with id ${id} does not exist`));
  }

  public createRecipe(recipe: NewRecipe): Observable<string> {
    const id = String(nextId++);

    recipes.push({
      ...recipe,
      _id: id,
    });

    return of(id).pipe(delay(1000));
  }

  public editRecipe(recipe: Recipe): Observable<undefined> {
    const oldRecipeIndex = recipes.findIndex(({ _id }) => _id === recipe._id);

    if (oldRecipeIndex > -1) {
      recipes[oldRecipeIndex] = { ...recipe };
    }

    return of(undefined).pipe(delay(1000));
  }

  public deleteRecipe(id: string): Observable<undefined> {
    const index = recipes.findIndex(({ _id }) => _id === id);

    if (index > -1) {
      recipes.splice(index, 1);
    }

    return of(undefined);
  }
}
