import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
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
  public processing: boolean = false;
  public fetchError?: string;

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _recipeService: RecipeService,
  ) {}

  public ngOnInit(): void {
    this.recipe$ = this._route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => typeof id === 'string'),
      tap(() => {
        this.processing = true;
        this.fetchError = undefined;

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

  public editRecipe(event: MouseEvent, id: string): void {
    event.stopPropagation();

    this._router.navigate(['../../edit', id], { relativeTo: this._route });
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
