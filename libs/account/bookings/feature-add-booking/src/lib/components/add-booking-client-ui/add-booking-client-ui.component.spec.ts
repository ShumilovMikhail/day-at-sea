import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookingClientUiComponent } from './add-booking-client-ui.component';

describe('AddBookingClientUiComponent', () => {
  let component: AddBookingClientUiComponent;
  let fixture: ComponentFixture<AddBookingClientUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingClientUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookingClientUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
