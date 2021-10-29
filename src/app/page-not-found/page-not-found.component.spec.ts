import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let component: PageNotFoundComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should contain status code', () => {
    const el: HTMLElement = fixture.nativeElement;
    const statusCode = el.querySelector('span.status-code');

    expect(statusCode).not.toBeNull();

    if (statusCode) {
      expect(statusCode.textContent).toBe('404');
    }
  });

  it('should contain status text', () => {
    const el: HTMLElement = fixture.nativeElement;
    const statusText = el.querySelector('span.status-text');

    expect(statusText).not.toBeNull();

    if (statusText) {
      expect(statusText.textContent).toBe('Page not found');
    }
  });
});
