import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  DurationStayDiscountItemFormVM,
  EarlyBookingDiscountItemFormVM,
  LastMinuteBookingDiscountItemFormVM,
} from '../types/prices-item.models';

interface CreateFormTypes {
  durationStay: (fb: FormBuilder) => FormGroup<DurationStayDiscountItemFormVM>;
  lastMinuteBooking: (fb: FormBuilder) => FormGroup<LastMinuteBookingDiscountItemFormVM>;
  earlyBooking: (fb: FormBuilder) => FormGroup<EarlyBookingDiscountItemFormVM>;
}

@Injectable()
export class PricesItemService {
  private readonly fb = inject(FormBuilder);
  private readonly createFormTypes: CreateFormTypes = {
    durationStay: (fb: FormBuilder): FormGroup<DurationStayDiscountItemFormVM> => {
      return fb.nonNullable.group({
        durationOver: [0],
        discount: [''],
        unit: ['руб'],
      });
    },
    lastMinuteBooking: (fb: FormBuilder): FormGroup<LastMinuteBookingDiscountItemFormVM> => {
      return fb.nonNullable.group({
        beforeDays: [0],
        discount: [''],
        unit: ['руб'],
      });
    },
    earlyBooking: (fb: FormBuilder): FormGroup<EarlyBookingDiscountItemFormVM> => {
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
