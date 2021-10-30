import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import {
  RecipeDeleteDialogComponent,
  RecipeDeleteDialogData,
} from '../recipe-delete-dialog/recipe-delete-dialog.component';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

function filterRecipes(
  filterValue: string,
  recipes: readonly Recipe[],
): readonly Recipe[] {
  const filter = filterValue.toLowerCase();

  return recipes.filter(
    ({ name, ingredients }) =>
      name.toLowerCase().includes(filter) ||
      ingredients.some(({ name }) => name.toLowerCase().includes(filter)),
  );
}

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public filter = new FormControl('');
  public filteredRecipes$?: Observable<readonly Recipe[]>;
  public processing: boolean = false;
  public fetchError?: string;
  private _routerSubscription?: Subscription;
  private readonly _recipesSubject = new BehaviorSubject<readonly Recipe[]>([]);

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _recipeService: RecipeService,
  ) {}

  public ngOnInit(): void {
    this.processing = true;
    this.fetchError = undefined;

    this._cd.markForCheck();
    this._recipeService.getRecipes().subscribe(
      (recipes) => {
        this._recipesSubject.next(recipes);
      },
      (error) => {
        this.processing = false;
        this.fetchError = String(error);
        this._cd.markForCheck();
      },
      () => {
        this.processing = false;
        this._cd.markForCheck();
      },
    );

    this._routerSubscription = this._router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart,
        ),
        map(() => this._router.getCurrentNavigation()?.extras.state),
        filter(
          (state): state is { [key: string]: unknown } =>
            typeof state === 'object',
        ),
      )
      .subscribe((state) => {
        if (typeof state.deletedId === 'string') {
          this._deleteRecipe(state.deletedId);
        } else if (
          typeof state.editedRecipe === 'object' &&
          state.editedRecipe !== null
        ) {
          this._editRecipe(state.editedRecipe as Recipe);
        } else if (
          typeof state.newRecipe === 'object' &&
          state.newRecipe !== null
        ) {
          this._createRecipe(state.newRecipe as Recipe);
        }
      });
    this.filteredRecipes$ = combineLatest([
      this.filter.valueChanges.pipe(startWith('')),
      this._recipesSubject.asObservable(),
    ]).pipe(
      map(([filterValue, recipes]) => {
        if (filterValue.length > 0) {
          return filterRecipes(filterValue, recipes);
        } else {
          return recipes;
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this._routerSubscription?.unsubscribe();
  }

  public openDetails(id: string): void {
    this._router.navigate(['details', id], { relativeTo: this._route });
  }

  public editRecipe(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this._router.navigate(['edit', id], { relativeTo: this._route });
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
        this._deleteRecipe(id);
      }
    });
  }

  public recipeTrackBy(index: number, recipe: Recipe): string {
    return recipe._id;
  }

  private _deleteRecipe(id: string): void {
    this._recipesSubject.next(
      this._recipesSubject.value.filter(({ _id }) => _id !== id),
    );
  }

  private _editRecipe(recipe: Recipe): void {
    const recipes = [...this._recipesSubject.value];
    const recipeIndex = recipes.findIndex(({ _id }) => _id === recipe._id);

    if (recipeIndex > -1) {
      recipes[recipeIndex] = recipe;
    }

    this._recipesSubject.next(recipes);
  }

  private _createRecipe(recipe: Recipe): void {
    this._recipesSubject.next([...this._recipesSubject.value, recipe]);
  }
}
