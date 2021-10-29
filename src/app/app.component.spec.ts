import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let openDialogSpy: jasmine.Spy;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    const matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    openDialogSpy = matDialog.open;

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [{ provide: MatDialog, useValue: matDialog }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should open the info dialog when a button is clicked', async () => {
    const el: HTMLElement = fixture.nativeElement;
    const button = el.querySelector('button');

    expect(button).not.toBeNull();

    if (button) {
      button.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(openDialogSpy.calls.count()).toBe(1);
    }
  });
});
