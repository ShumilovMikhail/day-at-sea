import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTableViewContainerComponent } from './settings-table-view-container.component';

describe('SettingsTableViewContainerComponent', () => {
  let component: SettingsTableViewContainerComponent;
  let fixture: ComponentFixture<SettingsTableViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTableViewContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsTableViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
