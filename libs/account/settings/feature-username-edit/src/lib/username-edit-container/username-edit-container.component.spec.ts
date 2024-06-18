import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsernameEditContainerComponent } from './username-edit-container.component';

describe('UsernameEditContainerComponent', () => {
  let component: UsernameEditContainerComponent;
  let fixture: ComponentFixture<UsernameEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
