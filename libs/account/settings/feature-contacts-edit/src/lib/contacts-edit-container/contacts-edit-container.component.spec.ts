import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsEditContainerComponent } from './contacts-edit-container.component';

describe('ContactsEditContainerComponent', () => {
  let component: ContactsEditContainerComponent;
  let fixture: ComponentFixture<ContactsEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsEditContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
