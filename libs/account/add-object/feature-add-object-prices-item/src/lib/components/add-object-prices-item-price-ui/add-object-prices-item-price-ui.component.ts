import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceVM } from '../../types/prices-item.models';
import { UiFormsCounterComponent, UiFormsInputComponent } from '@ui/forms';

@Component({
  selector: 'account-add-object-prices-item-price-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, UiFormsCounterComponent],
  templateUrl: './add-object-prices-item-price-ui.component.html',
  styleUrl: './add-object-prices-item-price-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesItemPriceUiComponent {
  @Input({ required: true }) price!: PriceVM;
}
