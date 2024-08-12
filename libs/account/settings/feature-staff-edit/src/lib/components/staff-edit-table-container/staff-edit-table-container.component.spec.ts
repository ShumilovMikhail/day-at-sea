import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffEditTableContainerComponent } from './staff-edit-table-container.component';

describe('StaffEditTableContainerComponent', () => {
  let component: StaffEditTableContainerComponent;
  let fixture: ComponentFixture<StaffEditTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEditTableContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffEditTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
