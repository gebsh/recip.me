import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NewRecipe, Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent {
  @Input() public formId?: string;
  @Input() public set recipe(recipe: Recipe) {
    this.recipeForm.setValue({
      name: recipe.name,
      description: recipe.description,
      preparationTime: recipe.preparationTimeInMinutes,
      ingredients: [],
    });
    this.ingredients.clear();
    recipe.ingredients.forEach(({ name, quantity }) => {
      this.addIngredient(name, quantity);
    });
  }
  @Output() submitRecipe = new EventEmitter<NewRecipe>();
  public readonly x = this._formBuilder.group({});
  public readonly recipeForm = this._formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255),
      ],
    ],
    preparationTime: [
      '',
      [Validators.required, Validators.pattern(/^\s*\d+\s*$/)],
    ],
    ingredients: this._formBuilder.array(
      [],
      [Validators.required, Validators.minLength(2)],
    ),
  });
  // This should be implemented as a custom MatFormFieldControl but it is out of
  // the scope of this task.
  private _wasSubmitted: boolean = false;
  private _ingredientsWereModified: boolean = false;

  public get ingredients(): FormArray {
    return this.recipeForm.get('ingredients')! as FormArray;
  }

  public get nameError(): 'minLength' | 'maxLength' | 'required' | null {
    if (this.recipeForm.get('name')!.hasError('minlength')) {
      return 'minLength';
    }

    if (this.recipeForm.get('name')!.hasError('maxlength')) {
      return 'maxLength';
    }

    if (this.recipeForm.get('name')!.hasError('required')) {
      return 'required';
    }

    return null;
  }

  public get descriptionError(): 'minLength' | 'maxLength' | 'required' | null {
    if (this.recipeForm.get('description')!.hasError('minlength')) {
      return 'minLength';
    }

    if (this.recipeForm.get('description')!.hasError('maxlength')) {
      return 'maxLength';
    }

    if (this.recipeForm.get('description')!.hasError('required')) {
      return 'required';
    }

    return null;
  }

  public get preparationTimeError(): 'pattern' | 'required' | null {
    if (this.recipeForm.get('preparationTime')!.hasError('pattern')) {
      return 'pattern';
    }

    if (this.recipeForm.get('preparationTime')!.hasError('required')) {
      return 'required';
    }

    return null;
  }

  public get ingredientsError(): 'minLength' | 'required' | null {
    if (this._wasSubmitted || this._ingredientsWereModified) {
      if (this.ingredients.hasError('minlength')) {
        return 'minLength';
      }

      if (this.ingredients.hasError('required')) {
        return 'required';
      }
    }

    return null;
  }

  constructor(private readonly _formBuilder: FormBuilder) {}

  public addIngredient(name: string = '', quantity: string = ''): void {
    this.ingredients.push(
      this._formBuilder.group({
        name: [name, [Validators.required]],
        quantity: [quantity, [Validators.required]],
      }),
    );
  }

  public ingredientControl(index: number): AbstractControl | null {
    return this.recipeForm.get(['ingredients', index]);
  }

  public removeIngredient(index: number): void {
    this._ingredientsWereModified = true;

    (this.recipeForm.get('ingredients')! as FormArray).removeAt(index);
  }

  public processSubmit(): void {
    this._wasSubmitted = true;

    if (this.recipeForm.valid) {
      // A new object must be created because not all fields have type `string`.
      this.submitRecipe.emit({
        name: this.recipeForm.get('name')!.value,
        description: this.recipeForm.get('description')!.value,
        preparationTimeInMinutes: Number(
          this.recipeForm.get('preparationTime')!.value,
        ),
        ingredients: this.recipeForm.get('ingredients')!.value,
      });
    }
  }
}
