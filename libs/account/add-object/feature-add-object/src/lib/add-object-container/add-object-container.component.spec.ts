import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectContainerComponent } from './add-object-container.component';

describe('AddObjectContainerComponent', () => {
  let component: AddObjectContainerComponent;
  let fixture: ComponentFixture<AddObjectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
