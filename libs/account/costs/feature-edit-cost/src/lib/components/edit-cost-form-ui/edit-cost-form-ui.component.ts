import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MyObjectsVM } from '@account/my-objects/data-access';
import {
  UiFormsCalendarComponent,
  UiFormsInputComponent,
  UiFormsInputNumbersComponent,
  UiFormsObjectsPickerComponent,
} from '@ui/forms';
import { CostForm } from '../../types/cost-form.models';
import { FormArrayPipe, FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-edit-cost-form-ui',
  standalone: true,
  imports: [
    CommonModule,
    UiFormsInputComponent,
    UiFormsObjectsPickerComponent,
    UiFormsCalendarComponent,
    UiFormsInputNumbersComponent,
    FormControlPipe,
    FormArrayPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-cost-form-ui.component.html',
  styleUrl: './edit-cost-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCostFormUiComponent {
  @Input({ required: true }) myObjects!: MyObjectsVM;
  @Input({ required: true }) form!: FormGroup<CostForm>;
}
