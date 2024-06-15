import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AgencyFacade } from '@account/data-access-agency';
import { ContactsVM } from '../types/contacts.models';
import { ContactsEditUiComponent } from '../contacts-edit-ui/contacts-edit-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-contacts-edit-container',
  standalone: true,
  imports: [CommonModule, ContactsEditUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './contacts-edit-container.component.html',
  styleUrl: './contacts-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditContainerComponent {
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly contactsVM$: Observable<ContactsVM | null> =
    this.agencyFacade.contacts$;
}
