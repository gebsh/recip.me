import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Recipe } from './recipe.model';

// TODO: Move this to an API.
const recipes: Recipe[] = [
  {
    _id: '1',
    name: 'Autumn Cheesecake',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et nulla eget quam porttitor malesuada vitae vel nunc. Curabitur mattis dapibus ex eu vehicula. Phasellus dui neque, porta ut suscipit non, vulputate et libero. In lacinia ac lectus ac eleifend. Morbi aliquam lorem maximus, efficitur mi consectetur, bibendum massa. Fusce.',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et nulla eget quam porttitor malesuada vitae vel nunc. Curabitur mattis dapibus ex eu vehicula. Phasellus dui neque, porta ut suscipit non, vulputate et libero. In lacinia ac lectus ac eleifend. Morbi aliquam lorem maximus, efficitur mi consectetur, bibendum massa. Fusce.',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et nulla eget quam porttitor malesuada vitae vel nunc. Curabitur mattis dapibus ex eu vehicula. Phasellus dui neque, porta ut suscipit non, vulputate et libero. In lacinia ac lectus ac eleifend. Morbi aliquam lorem maximus, efficitur mi consectetur, bibendum massa. Fusce.',
    preparationTimeInMinutes: 3.5 * 60,
    ingredients: [
      { _id: '65', name: 'Eggs', quantity: '2' },
      { _id: '66', name: 'White sugar', quantity: '3 tablespoons' },
      { _id: '67', name: 'Vanilla extract', quantity: '½ teaspoon' },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public getRecipes(): Observable<readonly Recipe[]> {
    return of(recipes);
  }

  public getRecipe(id: string): Observable<Recipe> {
    const recipe = recipes.find(({ _id }) => _id === id);

    if (recipe) {
      return of(recipe);
    }

    return throwError(new Error(`Recipe with id ${id} does not exist`));
  }

  public deleteRecipe(id: string): Observable<undefined> {
    const index = recipes.findIndex(({ _id }) => _id === id);

    if (index > -1) {
      recipes.splice(index, 1);
    }

    return of(undefined);
  }
}
