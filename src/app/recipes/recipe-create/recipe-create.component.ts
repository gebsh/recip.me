import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRecipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateComponent {
  public processing: boolean = false;
  public processError?: string;

  constructor(
    private readonly _location: Location,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _recipeService: RecipeService,
  ) {}

  public cancel(): void {
    this._location.back();
  }

  public create(recipe: NewRecipe): void {
    this.processing = true;

    this._recipeService.createRecipe(recipe).subscribe(
      (id) => {
        this._router.navigate(['../details', id], {
          relativeTo: this._route,
          state: {
            newRecipe: { ...recipe, _id: id },
          },
        });
      },
      (error) => {
        this.processError = String(error);
      },
      () => {
        this.processing = false;
      },
    );
  }
}
