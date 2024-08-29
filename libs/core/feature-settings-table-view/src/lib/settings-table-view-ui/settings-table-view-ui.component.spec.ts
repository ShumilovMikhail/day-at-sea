import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTableViewUiComponent } from './settings-table-view-ui.component';

describe('SettingsTableViewUiComponent', () => {
  let component: SettingsTableViewUiComponent;
  let fixture: ComponentFixture<SettingsTableViewUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTableViewUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsTableViewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
