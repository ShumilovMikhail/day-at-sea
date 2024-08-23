import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateBookingContainerComponent } from './update-booking-container.component';

describe('UpdateBookingContainerComponent', () => {
  let component: UpdateBookingContainerComponent;
  let fixture: ComponentFixture<UpdateBookingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBookingContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBookingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
