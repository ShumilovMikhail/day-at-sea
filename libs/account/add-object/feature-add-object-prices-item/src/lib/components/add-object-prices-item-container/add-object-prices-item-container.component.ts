import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { DiscountsVM, ObjectPricesItemVM } from '../../types/prices-item.models';
import { FormControlPipe, FormGroupPipe } from '@utils/pipes';
import { AddObjectPricesItemPriceUiComponent } from '../add-object-prices-item-price-ui/add-object-prices-item-price-ui.component';
import { AddObjectPricesItemDiscountsUiComponent } from '../add-object-prices-item-discounts-ui/add-object-prices-item-discounts-ui.component';
import { PricesItemService } from '../../services/prices-item.service';
import { AddObjectPricesItemWeekendDiscountUiComponent } from '../add-object-prices-item-weekend-discount-ui/add-object-prices-item-weekend-discount-ui.component';
import { AddObjectPricesItemAdditionalGuestsUiComponent } from '../add-object-prices-item-additional-guests-ui/add-object-prices-item-additional-guests-ui.component';

@Component({
  selector: 'account-add-object-prices-item-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    FormGroupPipe,
    FormControlPipe,
    ReactiveFormsModule,
    AddObjectPricesItemPriceUiComponent,
    AddObjectPricesItemDiscountsUiComponent,
    AddObjectPricesItemWeekendDiscountUiComponent,
    AddObjectPricesItemAdditionalGuestsUiComponent,
  ],
  providers: [PricesItemService],
  templateUrl: './add-object-prices-item-container.component.html',
  styleUrl: './add-object-prices-item-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesItemContainerComponent {
  @Input({ required: true }) pricesItem!: FormGroup<ObjectPricesItemVM>;
  private readonly pricesItemService = inject(PricesItemService);

  public onAddDiscount(type: string): void {
    const form = this.pricesItemService.createFormByType(type as keyof DiscountsVM);
    (this.pricesItem.get('discounts')?.get(type) as FormArray).push(form);
  }

  public onRemoveDiscount(type: string, index: number): void {
    (this.pricesItem.get('discounts')?.get(type) as FormArray).removeAt(index);
  }
}
