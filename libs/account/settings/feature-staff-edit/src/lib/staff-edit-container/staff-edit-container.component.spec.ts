import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffEditContainerComponent } from './staff-edit-container.component';

describe('StaffEditContainerComponent', () => {
  let component: StaffEditContainerComponent;
  let fixture: ComponentFixture<StaffEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
