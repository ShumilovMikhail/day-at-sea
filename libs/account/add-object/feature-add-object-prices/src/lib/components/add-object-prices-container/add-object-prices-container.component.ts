import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectFormPricesItemVM, PricesType } from '../../types/prices-form.models';
import { AddObjectPricesDefaultContainerComponent } from '../add-object-prices-default-container/add-object-prices-default-container.component';
import { FormGroup } from '@angular/forms';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectPricesItemVM } from '../../types/prices.models';

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
  private readonly objectFormStore = inject(ObjectFormStore);

  get defaultPrices(): FormGroup<ObjectFormPricesItemVM> {
    const defaultPrices = this.pricesArray.controls.find((form) => form.get('name')!.value === 'Цены по умолчанию');
    if (!defaultPrices) {
      throw Error('default prices: not found form');
    }
    return defaultPrices;
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ prices: this.pricesArray.value as ObjectPricesItemVM[] });
  }
}
