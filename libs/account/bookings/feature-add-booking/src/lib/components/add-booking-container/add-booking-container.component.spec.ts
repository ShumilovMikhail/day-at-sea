import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookingContainerComponent } from './add-booking-container.component';

describe('AddBookingContainerComponent', () => {
  let component: AddBookingContainerComponent;
  let fixture: ComponentFixture<AddBookingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
