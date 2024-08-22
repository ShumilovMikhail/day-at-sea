import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBookingsContainerComponent } from './my-bookings-container.component';

describe('MyBookingsContainerComponent', () => {
  let component: MyBookingsContainerComponent;
  let fixture: ComponentFixture<MyBookingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBookingsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
