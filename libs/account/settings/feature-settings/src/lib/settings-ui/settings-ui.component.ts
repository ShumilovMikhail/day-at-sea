import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyVM, ContactsVM, UserVM } from '../types/settings.models';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-settings-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective],
  templateUrl: './settings-ui.component.html',
  styleUrl: './settings-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsUiComponent implements OnInit {
  @Input({ required: true }) userVM!: UserVM;
  @Input({ required: true }) agencyVM!: AgencyVM;
  public contactsVM!: ContactsVM;

  ngOnInit(): void {
    this.contactsVM = this.agencyVM.contacts;
  }
}
