import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from '../recipe.service';

export interface RecipeDeleteDialogData {
  readonly _id: string;
  readonly name: string;
}

@Component({
  selector: 'app-recipe-delete-dialog',
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrls: ['./recipe-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDeleteDialogComponent {
  public processing: boolean = false;
  public error?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: RecipeDeleteDialogData,
    private readonly _dialogRef: MatDialogRef<RecipeDeleteDialogComponent>,
    private readonly _recipeService: RecipeService,
  ) {}

  public deleteRecipe(): void {
    this.processing = true;
    this.error = undefined;

    this._recipeService.deleteRecipe(this.data._id).subscribe(
      () => {
        this._dialogRef.close(true);
      },
      (error) => {
        this.error = String(error);
      },
      () => {
        this.processing = false;
      },
    );
  }
}
