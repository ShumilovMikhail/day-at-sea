import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginEditContainerComponent } from './login-edit-container.component';

describe('LoginEditContainerComponent', () => {
  let component: LoginEditContainerComponent;
  let fixture: ComponentFixture<LoginEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
