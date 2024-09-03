import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureNotificationsComponent } from './feature-notifications.component';

describe('FeatureNotificationsComponent', () => {
  let component: FeatureNotificationsComponent;
  let fixture: ComponentFixture<FeatureNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureNotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
