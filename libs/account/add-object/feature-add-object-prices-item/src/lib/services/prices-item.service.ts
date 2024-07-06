import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  DurationStayDiscountItemVM,
  EarlyBookingDiscountItemVM,
  LastMinuteBookingDiscountItemVM,
} from '../types/prices-item.models';

interface CreateFormTypes {
  durationStay: (fb: FormBuilder) => FormGroup<DurationStayDiscountItemVM>;
  lastMinuteBooking: (fb: FormBuilder) => FormGroup<LastMinuteBookingDiscountItemVM>;
  earlyBooking: (fb: FormBuilder) => FormGroup<EarlyBookingDiscountItemVM>;
}

@Injectable()
export class PricesItemService {
  private readonly fb = inject(FormBuilder);
  private readonly createFormTypes: CreateFormTypes = {
    durationStay: (fb: FormBuilder): FormGroup<DurationStayDiscountItemVM> => {
      return fb.nonNullable.group({
        durationOver: [0],
        discount: [''],
        unit: ['руб'],
      });
    },
    lastMinuteBooking: (fb: FormBuilder): FormGroup<LastMinuteBookingDiscountItemVM> => {
      return fb.nonNullable.group({
        beforeDays: [0],
        discount: [''],
        unit: ['руб'],
      });
    },
    earlyBooking: (fb: FormBuilder): FormGroup<EarlyBookingDiscountItemVM> => {
      return fb.nonNullable.group({
        beforeMonths: [0],
        discount: [''],
        unit: ['руб'],
      });
    },
  };
  public createFormByType(type: keyof CreateFormTypes): FormGroup {
    return this.createFormTypes[type](this.fb);
  }
}
