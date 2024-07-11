import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChannelsContainerComponent } from './sales-channels-container.component';

describe('SalesChannelsContainerComponent', () => {
  let component: SalesChannelsContainerComponent;
  let fixture: ComponentFixture<SalesChannelsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChannelsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChannelsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
