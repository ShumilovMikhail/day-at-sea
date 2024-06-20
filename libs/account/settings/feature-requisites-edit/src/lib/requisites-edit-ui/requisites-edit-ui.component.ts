import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RequisitesForm } from '../types/requisites.models';
import { UiFormsInputComponent, UiFormsPhoneComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-requisites-edit-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, FormControlPipe, UiFormsPhoneComponent],
  templateUrl: './requisites-edit-ui.component.html',
  styleUrl: './requisites-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditUiComponent {
  @Input({ required: true }) formRequisites!: FormGroup<RequisitesForm>;
}
