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
