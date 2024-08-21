import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookingInstalmentsUiComponent } from './add-booking-instalments-ui.component';

describe('AddBookingInstalmentsUiComponent', () => {
  let component: AddBookingInstalmentsUiComponent;
  let fixture: ComponentFixture<AddBookingInstalmentsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingInstalmentsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookingInstalmentsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
