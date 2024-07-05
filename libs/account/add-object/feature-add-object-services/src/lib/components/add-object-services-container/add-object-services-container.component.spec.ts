import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectServicesContainerComponent } from './add-object-services-container.component';

describe('AddObjectServicesContainerComponent', () => {
  let component: AddObjectServicesContainerComponent;
  let fixture: ComponentFixture<AddObjectServicesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectServicesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectServicesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
