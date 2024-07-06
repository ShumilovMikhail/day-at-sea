import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup } from '@angular/forms';

import {
  DiscountsFormVM,
  DurationStayDiscountItemFormVM,
  EarlyBookingDiscountItemFormVM,
  LastMinuteBookingDiscountItemFormVM,
} from '../../types/prices-item.models';
import { UiFormsCounterComponent, UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';

@Component({
  selector: 'account-add-object-prices-item-discounts-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, UiFormsCounterComponent, UiFormsSelectComponent],
  templateUrl: './add-object-prices-item-discounts-ui.component.html',
  styleUrl: './add-object-prices-item-discounts-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesItemDiscountsUiComponent {
  @Input({ required: true }) discounts!: FormGroup<DiscountsFormVM>;
  @Output() addDiscountEvent = new EventEmitter<string>();
  @Output() removeDiscountEvent = new EventEmitter<{ type: string; index: number }>();

  get durationStayArray(): FormGroup<DurationStayDiscountItemFormVM>[] {
    return (this.discounts.get('durationStay') as FormArray).controls as FormGroup<DurationStayDiscountItemFormVM>[];
  }

  get earlyBookingArray(): FormGroup<EarlyBookingDiscountItemFormVM>[] {
    return (this.discounts.get('earlyBooking') as FormArray).controls as FormGroup<EarlyBookingDiscountItemFormVM>[];
  }

  get lastMinuteBookingArray(): FormGroup<LastMinuteBookingDiscountItemFormVM>[] {
    return (this.discounts.get('lastMinuteBooking') as FormArray)
      .controls as FormGroup<LastMinuteBookingDiscountItemFormVM>[];
  }

  public onAddDiscount(type: string): void {
    this.addDiscountEvent.emit(type);
  }

  public onRemoveDiscount(type: string, index: number): void {
    this.removeDiscountEvent.emit({ type, index });
  }
}
