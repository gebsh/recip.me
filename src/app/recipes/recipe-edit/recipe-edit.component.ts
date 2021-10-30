import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { NewRecipe, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  public recipe$?: Observable<Recipe>;
  public processing: boolean = false;
  public fetchError?: string;
  public processError?: string;

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _location: Location,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _recipeService: RecipeService,
  ) {}

  public ngOnInit(): void {
    this.recipe$ = this._route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => typeof id === 'string'),
      tap(() => {
        this.processing = true;
        this.fetchError = undefined;
        this.processError = undefined;

        this._cd.markForCheck();
      }),
      switchMap((id) => this._recipeService.getRecipe(id)),
      tap(() => {
        this.processing = false;
      }),
      catchError((error) => {
        this.processing = false;
        this.fetchError = String(error);

        return EMPTY;
      }),
    );
  }

  public cancel(): void {
    this._location.back();
  }

  public save(modifiedRecipe: NewRecipe, id: string): void {
    const recipe: Recipe = {
      ...modifiedRecipe,
      _id: id,
    };
    this.processing = true;

    this._recipeService.editRecipe(recipe).subscribe(
      () => {
        this._router.navigate(['../../details', id], {
          relativeTo: this._route,
          state: {
            editedRecipe: recipe,
          },
        });
      },
      (error) => {
        this.processing = false;
        this.processError = String(error);
      },
      () => {
        this.processing = false;
      },
    );
  }
}
