import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, take } from 'rxjs';

import { AgencyFacade, Contacts } from '@account/data-access-agency';
import { ContactsForm, ContactsVM } from '../types/contacts.models';
import { ContactsEditUiComponent } from '../contacts-edit-ui/contacts-edit-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { contactsEntityToVM } from './contactsEntityToVM.adapter';
export { contactsEntityToVM } from './contactsEntityToVM.adapter';

@Component({
  selector: 'account-contacts-edit-container',
  standalone: true,
  imports: [CommonModule, ContactsEditUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './contacts-edit-container.component.html',
  styleUrl: './contacts-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditContainerComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly fb = inject(FormBuilder);
  private readonly contactsVM$: Observable<Contacts | null> =
    this.agencyFacade.contacts$;
  public form!: FormGroup<ContactsForm>;

  ngOnInit(): void {
    this.contactsVM$
      .pipe(
        filter((contactsVM: Contacts | null): contactsVM is Contacts =>
          Boolean(contactsVM)
        ),
        take(1),
        map((contactsEntity: Contacts): ContactsVM => {
          return contactsEntityToVM.entityToVM(contactsEntity);
        })
      )
      .subscribe((contactsVM: ContactsVM) => {
        this.initializeForm(contactsVM);
      });
  }

  private initializeForm(contactsVM: ContactsVM): void {
    this.form = this.fb.group({
      phones: new FormArray(
        contactsVM.phones.map((phone: string | null) => new FormControl(phone))
      ),
      site: [contactsVM.site],
      vk: [contactsVM.vk],
      ok: [contactsVM.ok],
      whatsapp: [contactsVM.whatsapp],
      telegram: [contactsVM.telegram],
      viber: [contactsVM.viber],
    });
    this.changeDetectorRef.detectChanges();
  }
}
