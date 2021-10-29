import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { PreparationTimePipe } from '../preparation-time.pipe';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeDetailsComponent } from './recipe-details.component';

describe('RecipeDetailsComponent', () => {
  let activatedRouteStub: ActivatedRouteStub;
  let recipeServiceStub: Partial<RecipeService>;
  let fixture: ComponentFixture<RecipeDetailsComponent>;
  let component: RecipeDetailsComponent;

  beforeEach(async () => {
    activatedRouteStub = new ActivatedRouteStub({ id: '1' });
    recipeServiceStub = {
      getRecipe(id: string): Observable<Recipe> {
        return of({
          _id: id,
          name: 'Recipe name',
          description: 'Recipe description',
          preparationTimeInMinutes: 4 * 60,
          ingredients: [
            { _id: '1', name: 'Ingredient 1', quantity: '2' },
            { _id: '2', name: 'Ingredient 2', quantity: '1 tablespoon' },
            { _id: '3', name: 'Ingredient 3', quantity: '4.5' },
          ],
        });
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailsComponent, PreparationTimePipe],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: RecipeService, useValue: recipeServiceStub },
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatProgressBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should display recipe name', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelectorAll('dd').item(0);

    expect(name).not.toBeNull();

    if (name) {
      expect(name.textContent).toBe('Recipe name');
    }
  });

  it('should display recipe description', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelectorAll('dd').item(1);

    expect(name).not.toBeNull();

    if (name) {
      expect(name.textContent).toBe('Recipe description');
    }
  });

  it('should display recipe preparation time', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelectorAll('dd').item(2);

    expect(name).not.toBeNull();

    if (name) {
      expect(name.textContent).toBe('4 h');
    }
  });

  it('should display all ingredients', () => {
    const el: HTMLElement = fixture.nativeElement;
    const ingredientsList = el.querySelector('dd > ul');

    expect(ingredientsList).not.toBeNull();

    if (ingredientsList) {
      expect(ingredientsList.childElementCount).toBe(3);
      // List elements preserve whitespace so we have to trim it.
      expect(ingredientsList.children[0].textContent?.trim()).toBe(
        'Ingredient 1: 2',
      );
    }
  });
});
