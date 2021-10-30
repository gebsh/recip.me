import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeService } from '../recipe.service';
import { RecipeCreateComponent } from './recipe-create.component';

describe('RecipeCreateComponent', () => {
  let fixture: ComponentFixture<RecipeCreateComponent>;
  let component: RecipeCreateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCreateComponent, RecipeFormComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [{ provide: RecipeService, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
