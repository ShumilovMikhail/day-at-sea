import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCostContainerComponent } from './add-cost-container.component';

describe('AddCostContainerComponent', () => {
  let component: AddCostContainerComponent;
  let fixture: ComponentFixture<AddCostContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCostContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
