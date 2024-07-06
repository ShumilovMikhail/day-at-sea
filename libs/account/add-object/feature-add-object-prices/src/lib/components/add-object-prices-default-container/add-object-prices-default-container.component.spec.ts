import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectPricesDefaultContainerComponent } from './add-object-prices-default-container.component';

describe('AddObjectPricesDefaultContainerComponent', () => {
  let component: AddObjectPricesDefaultContainerComponent;
  let fixture: ComponentFixture<AddObjectPricesDefaultContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectPricesDefaultContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectPricesDefaultContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
