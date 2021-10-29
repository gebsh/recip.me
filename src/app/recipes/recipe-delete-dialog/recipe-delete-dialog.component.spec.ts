import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';

// TODO
describe('RecipeDeleteDialogComponent', () => {
  let matDialogRefSpy: jasmine.Spy;
  let recipeServiceSpy: jasmine.Spy;
  let fixture: ComponentFixture<RecipeDeleteDialogComponent>;
  let component: RecipeDeleteDialogComponent;

  beforeEach(async () => {
    const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const recipeService = jasmine.createSpyObj('RecipeService', [
      'deleteRecipe',
    ]);
    matDialogRefSpy = matDialogRef.close;
    recipeServiceSpy = recipeService.deleteRecipe.and.returnValue(
      of(undefined),
    );

    await TestBed.configureTestingModule({
      declarations: [RecipeDeleteDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { _id: '1', name: 'Recipe 1' } },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: RecipeService, useValue: recipeService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDeleteDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should call the recipe service and close the dialog on recipe removal', async () => {
    component.deleteRecipe();
    expect(matDialogRefSpy.calls.count()).toBe(1);
    expect(recipeServiceSpy.calls.count()).toBe(1);
  });
});
