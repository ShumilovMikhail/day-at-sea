import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectPricesItemContainerComponent } from './add-object-prices-item-container.component';

describe('AddObjectPricesItemContainerComponent', () => {
  let component: AddObjectPricesItemContainerComponent;
  let fixture: ComponentFixture<AddObjectPricesItemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectPricesItemContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectPricesItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
