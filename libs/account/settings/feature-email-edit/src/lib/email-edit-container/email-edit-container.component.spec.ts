import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailEditContainerComponent } from './email-edit-container.component';

describe('EmailEditContainerComponent', () => {
  let component: EmailEditContainerComponent;
  let fixture: ComponentFixture<EmailEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
