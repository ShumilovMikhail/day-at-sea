import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuUiComponent } from './side-menu-ui.component';

describe('SideMenuUiComponent', () => {
  let component: SideMenuUiComponent;
  let fixture: ComponentFixture<SideMenuUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
