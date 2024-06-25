import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectFloorInfoUiComponent } from './add-object-floor-info-ui.component';

describe('AddObjectFloorInfoUiComponent', () => {
  let component: AddObjectFloorInfoUiComponent;
  let fixture: ComponentFixture<AddObjectFloorInfoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectFloorInfoUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectFloorInfoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
