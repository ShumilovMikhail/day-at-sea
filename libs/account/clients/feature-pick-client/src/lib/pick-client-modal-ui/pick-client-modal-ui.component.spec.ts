import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickClientModalUiComponent } from './pick-client-modal-ui.component';

describe('PickClientModalUiComponent', () => {
  let component: PickClientModalUiComponent;
  let fixture: ComponentFixture<PickClientModalUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickClientModalUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PickClientModalUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
