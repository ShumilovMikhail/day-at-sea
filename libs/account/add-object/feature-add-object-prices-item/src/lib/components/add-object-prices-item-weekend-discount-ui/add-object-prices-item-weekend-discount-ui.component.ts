import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { WeekendDiscountVM } from '../../types/prices-item.models';
import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-prices-item-weekend-discount-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, FormControlPipe, ReactiveFormsModule],
  templateUrl: './add-object-prices-item-weekend-discount-ui.component.html',
  styleUrl: './add-object-prices-item-weekend-discount-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesItemWeekendDiscountUiComponent {
  @Input({ required: true }) weekendDiscount!: FormGroup<WeekendDiscountVM>;
}
