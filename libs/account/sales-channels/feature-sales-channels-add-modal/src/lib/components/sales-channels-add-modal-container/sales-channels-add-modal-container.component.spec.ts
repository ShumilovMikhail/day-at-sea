import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChannelsAddModalContainerComponent } from './sales-channels-add-modal-container.component';

describe('SalesChannelsAddModalContainerComponent', () => {
  let component: SalesChannelsAddModalContainerComponent;
  let fixture: ComponentFixture<SalesChannelsAddModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChannelsAddModalContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChannelsAddModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
