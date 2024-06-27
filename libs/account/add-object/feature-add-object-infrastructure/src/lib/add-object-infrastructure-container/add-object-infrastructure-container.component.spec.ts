import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectInfrastructureContainerComponent } from './add-object-infrastructure-container.component';

describe('AddObjectInfrastructureContainerComponent', () => {
  let component: AddObjectInfrastructureContainerComponent;
  let fixture: ComponentFixture<AddObjectInfrastructureContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectInfrastructureContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectInfrastructureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
