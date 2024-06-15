import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ContactsForm } from '../types/contacts.models';

@Component({
  selector: 'account-contacts-edit-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-edit-ui.component.html',
  styleUrl: './contacts-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditUiComponent {
  @Input({ required: true }) form!: FormGroup<ContactsForm>;
}
