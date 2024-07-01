import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectPhotosContainerComponent } from './add-object-photos-container.component';

describe('AddObjectPhotosContainerComponent', () => {
  let component: AddObjectPhotosContainerComponent;
  let fixture: ComponentFixture<AddObjectPhotosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectPhotosContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectPhotosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
