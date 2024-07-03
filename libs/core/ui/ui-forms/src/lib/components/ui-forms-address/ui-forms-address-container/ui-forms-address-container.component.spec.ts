import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFormsAddressContainerComponent } from './ui-forms-address-container.component';

describe('UiFormAddressContainerComponent', () => {
  let component: UiFormsAddressContainerComponent;
  let fixture: ComponentFixture<UiFormsAddressContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormsAddressContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiFormsAddressContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
