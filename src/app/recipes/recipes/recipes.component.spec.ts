import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let fixture: ComponentFixture<RecipesComponent>;
  let component: RecipesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesComponent, RecipesListComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
      ],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            getRecipes(): Observable<readonly Recipe[]> {
              return of([
                {
                  _id: '1',
                  name: 'Recipe name',
                  description: 'Recipe description',
                  preparationTimeInMinutes: 4 * 60,
                  ingredients: [
                    { _id: '1', name: 'Ingredient 1', quantity: '2' },
                    {
                      _id: '2',
                      name: 'Ingredient 2',
                      quantity: '1 tablespoon',
                    },
                    { _id: '3', name: 'Ingredient 3', quantity: '4.5' },
                  ],
                },
              ]);
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should contain list of recipes', () => {
    const el: HTMLElement = fixture.nativeElement;
    const list = el.querySelector('section.list-section > app-recipes-list');

    expect(list).not.toBeNull();
  });
});
