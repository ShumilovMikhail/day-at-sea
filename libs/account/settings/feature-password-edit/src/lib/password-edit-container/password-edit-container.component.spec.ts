import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordEditContainerComponent } from './password-edit-container.component';

describe('PasswordEditContainerComponent', () => {
  let component: PasswordEditContainerComponent;
  let fixture: ComponentFixture<PasswordEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
