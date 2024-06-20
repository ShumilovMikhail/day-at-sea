import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequisitesEditContainerComponent } from './requisites-edit-container.component';

describe('RequisitesEditContainerComponent', () => {
  let component: RequisitesEditContainerComponent;
  let fixture: ComponentFixture<RequisitesEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitesEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitesEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
