import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ArrivalVM } from '../../types/rules.models';
import { UiFormsInputComponent } from '@ui/forms';

@Component({
  selector: 'account-add-object-rules-arrival-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, ReactiveFormsModule],
  templateUrl: './add-object-rules-arrival-ui.component.html',
  styleUrl: './add-object-rules-arrival-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesArrivalUiComponent {
  @Input({ required: true }) arrival!: ArrivalVM;
}
