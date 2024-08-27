import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyClientsContainerComponent } from './my-clients-container.component';

describe('MyClientsContainerComponent', () => {
  let component: MyClientsContainerComponent;
  let fixture: ComponentFixture<MyClientsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyClientsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyClientsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
