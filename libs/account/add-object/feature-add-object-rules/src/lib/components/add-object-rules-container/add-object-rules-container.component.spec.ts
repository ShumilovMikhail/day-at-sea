import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObjectRulesContainerComponent } from './add-object-rules-container.component';

describe('AddObjectRulesContainerComponent', () => {
  let component: AddObjectRulesContainerComponent;
  let fixture: ComponentFixture<AddObjectRulesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectRulesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectRulesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
