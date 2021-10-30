import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../api';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: API_URL, useValue: '' }],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
