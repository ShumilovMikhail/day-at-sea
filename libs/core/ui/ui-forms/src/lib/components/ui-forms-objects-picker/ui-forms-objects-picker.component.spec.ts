import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFormsObjectsPickerComponent } from './ui-forms-objects-picker.component';

describe('UiFormsObjectsPickerComponent', () => {
  let component: UiFormsObjectsPickerComponent;
  let fixture: ComponentFixture<UiFormsObjectsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormsObjectsPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiFormsObjectsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
