import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectPricesContainerComponent } from './add-object-prices-container.component';

describe('AddObjectPricesContainerComponent', () => {
  let component: AddObjectPricesContainerComponent;
  let fixture: ComponentFixture<AddObjectPricesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectPricesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectPricesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
