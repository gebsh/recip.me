import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../api';
import { NewRecipe, Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly _resource: string = 'recipe';

  constructor(
    @Inject(API_URL) private readonly _url: string,
    private readonly _http: HttpClient,
  ) {}

  public getRecipes(): Observable<readonly Recipe[]> {
    return this._http
      .get<readonly Recipe[]>(`${this._url}/${this._resource}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `An error occurred while fetching recipes: ${error.error}`,
          );
        }),
      );
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this._http.get<Recipe>(`${this._url}/${this._resource}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `An error occurred while fetching the recipe ${id}: ${error.error}`,
        );
      }),
    );
  }

  public createRecipe(recipe: NewRecipe): Observable<Recipe> {
    return this._http
      .post<Recipe>(`${this._url}/${this._resource}`, recipe)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `An error occurred while creating a new recipe: ${error.error}`,
          );
        }),
      );
  }

  public editRecipe(recipe: Recipe): Observable<{}> {
    const { _id, ...editedRecipe } = recipe;

    return this._http
      .put<Recipe>(`${this._url}/${this._resource}/${_id}`, editedRecipe)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `An error occurred while editing the recipe ${_id}: ${error.error}`,
          );
        }),
      );
  }

  public deleteRecipe(id: string): Observable<{}> {
    return this._http.delete(`${this._url}/${this._resource}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `An error occurred while deleting the recipe ${id}: ${error.error}`,
        );
      }),
    );
  }
}
