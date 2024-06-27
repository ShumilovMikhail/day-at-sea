import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectInfrastructureUiComponent } from './add-object-infrastructure-ui.component';

describe('AddObjectInfrastructureUiComponent', () => {
  let component: AddObjectInfrastructureUiComponent;
  let fixture: ComponentFixture<AddObjectInfrastructureUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectInfrastructureUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectInfrastructureUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
