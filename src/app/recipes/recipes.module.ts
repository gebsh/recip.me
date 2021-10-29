import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { SharedModule } from '../shared/shared.module';
import { PreparationTimePipe } from './preparation-time.pipe';
import { RecipeDeleteDialogComponent } from './recipe-delete-dialog/recipe-delete-dialog.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeCreateComponent,
    PreparationTimePipe,
    RecipeDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    SharedModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
