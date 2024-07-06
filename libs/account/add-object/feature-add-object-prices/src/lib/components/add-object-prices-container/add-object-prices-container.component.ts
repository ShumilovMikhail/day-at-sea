import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectPricesItemVM, PricesType } from '../../types/prices.models';
import { AddObjectPricesDefaultContainerComponent } from '../add-object-prices-default-container/add-object-prices-default-container.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'account-add-object-prices-container',
  standalone: true,
  imports: [CommonModule, AddObjectPricesDefaultContainerComponent],
  templateUrl: './add-object-prices-container.component.html',
  styleUrl: './add-object-prices-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesContainerComponent {
  @Input({ required: true }) pricesArray!: PricesType;

  get defaultPrices(): FormGroup<ObjectPricesItemVM> {
    const defaultPrices = this.pricesArray.controls.find((form) => form.get('name')!.value === 'Цены по умолчанию');
    if (!defaultPrices) {
      throw Error('default prices: not found form');
    }
    return defaultPrices;
  }
}
