import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectCharacteristicsContainerComponent } from './add-object-characteristics-container.component';

describe('AddObjectCharacteristicsContainerComponent', () => {
  let component: AddObjectCharacteristicsContainerComponent;
  let fixture: ComponentFixture<AddObjectCharacteristicsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectCharacteristicsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectCharacteristicsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
