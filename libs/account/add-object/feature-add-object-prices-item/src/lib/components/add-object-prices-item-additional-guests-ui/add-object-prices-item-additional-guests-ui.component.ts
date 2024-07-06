import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { AdditionalGuestsVM } from '../../types/prices-item.models';
import { UiFormsCounterComponent, UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-prices-item-additional-guests-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, UiFormsCounterComponent, UiFormsSelectComponent, FormControlPipe],
  templateUrl: './add-object-prices-item-additional-guests-ui.component.html',
  styleUrl: './add-object-prices-item-additional-guests-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesItemAdditionalGuestsUiComponent {
  @Input({ required: true }) additionalGuests!: FormGroup<AdditionalGuestsVM>;
}
