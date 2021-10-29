import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog.component';

describe('InfoDialogComponent', () => {
  let fixture: ComponentFixture<InfoDialogComponent>;
  let component: InfoDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoDialogComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should contain information about the author', () => {
    const el: HTMLElement = fixture.nativeElement;
    const author = el.querySelector('mat-dialog-content');

    expect(author).not.toBeNull();

    if (author) {
      expect(author.textContent).toContain('Szymon Gebler');
    }
  });

  it('should contain the "close" button', () => {
    const el: HTMLElement = fixture.nativeElement;
    const close = el.querySelector('button[mat-dialog-close]');

    expect(close).not.toBeNull();
  });
});
