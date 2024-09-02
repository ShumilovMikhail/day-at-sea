import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickClientContainerComponent } from './pick-client-container.component';

describe('PickClientContainerComponent', () => {
  let component: PickClientContainerComponent;
  let fixture: ComponentFixture<PickClientContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickClientContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PickClientContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
