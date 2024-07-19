import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyObjectsContainerComponent } from './my-objects-container.component';

describe('MyObjectsContainerComponent', () => {
  let component: MyObjectsContainerComponent;
  let fixture: ComponentFixture<MyObjectsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyObjectsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyObjectsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
