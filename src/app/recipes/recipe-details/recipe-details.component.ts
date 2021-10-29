import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  RecipeDeleteDialogComponent,
  RecipeDeleteDialogData,
} from '../recipe-delete-dialog/recipe-delete-dialog.component';
import { Ingredient, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnInit {
  public recipe$?: Observable<Recipe>;
  public error?: string;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _recipeService: RecipeService,
  ) {}

  public ngOnInit(): void {
    this.recipe$ = this._route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => typeof id === 'string'),
      switchMap((id) => this._recipeService.getRecipe(id)),
      catchError((error) => {
        this.error = String(error);

        return EMPTY;
      }),
    );
  }

  public deleteRecipe(event: MouseEvent, id: string, name: string): void {
    event.stopPropagation();

    const dialogRef = this._dialog.open<
      RecipeDeleteDialogComponent,
      RecipeDeleteDialogData,
      boolean
    >(RecipeDeleteDialogComponent, {
      width: '40%',
      disableClose: true,
      data: { _id: id, name },
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this._router.navigate(['../../'], {
          relativeTo: this._route,
          replaceUrl: true,
          state: { deletedId: id },
        });
      }
    });
  }

  public ingredientTrackBy(index: number, ingredient: Ingredient): string {
    return ingredient._id;
  }
}
