import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesEditContainerComponent } from './rules-edit-container.component';

describe('RulesEditContainerComponent', () => {
  let component: RulesEditContainerComponent;
  let fixture: ComponentFixture<RulesEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
