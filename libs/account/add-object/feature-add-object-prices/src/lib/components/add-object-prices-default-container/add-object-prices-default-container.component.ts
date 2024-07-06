import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ObjectPricesItemVM } from '../../types/prices.models';
import { AddObjectPricesItemContainerComponent } from '@account/add-object/feature-add-object-prices-item';

@Component({
  selector: 'account-add-object-prices-default-container',
  standalone: true,
  imports: [CommonModule, AddObjectPricesItemContainerComponent],
  templateUrl: './add-object-prices-default-container.component.html',
  styleUrl: './add-object-prices-default-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesDefaultContainerComponent {
  @Input({ required: true }) defaultPrices!: FormGroup<ObjectPricesItemVM>;
}
