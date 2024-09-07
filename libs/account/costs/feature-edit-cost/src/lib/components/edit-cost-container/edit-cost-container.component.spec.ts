import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCostContainerComponent } from './edit-cost-container.component';

describe('EditCostContainerComponent', () => {
  let component: EditCostContainerComponent;
  let fixture: ComponentFixture<EditCostContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCostContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
