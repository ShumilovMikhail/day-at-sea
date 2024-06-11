import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuContainerComponent } from './side-menu-container.component';

describe('SideMenuContainerComponent', () => {
  let component: SideMenuContainerComponent;
  let fixture: ComponentFixture<SideMenuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
