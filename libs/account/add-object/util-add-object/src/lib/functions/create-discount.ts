import { FormBuilder, FormGroup } from '@angular/forms';

import {
  DurationStayDiscountItemForm,
  EarlyBookingDiscountItemForm,
  LastMinuteBookingDiscountItemForm,
} from '../types/object-form.models';
import {
  DurationStayDiscountItem,
  EarlyBookingDiscountItem,
  LastMinuteBookingDiscountItem,
} from '../types/agency-object.models';

interface CreateFormTypes {
  durationStay: (fb: FormBuilder, form: DurationStayDiscountItem | null) => FormGroup<DurationStayDiscountItemForm>;
  lastMinuteBooking: (
    fb: FormBuilder,
    form: LastMinuteBookingDiscountItem | null
  ) => FormGroup<LastMinuteBookingDiscountItemForm>;
  earlyBooking: (fb: FormBuilder, form: EarlyBookingDiscountItem | null) => FormGroup<EarlyBookingDiscountItemForm>;
}

const createDiscountFormTypes: CreateFormTypes = {
  durationStay: (fb: FormBuilder, form: DurationStayDiscountItem | null): FormGroup<DurationStayDiscountItemForm> => {
    return fb.nonNullable.group({
      durationOver: [form?.durationOver ?? 0],
      discount: [form?.discount ?? ''],
      unit: [form?.unit ?? 'руб'],
    });
  },
  lastMinuteBooking: (
    fb: FormBuilder,
    form: LastMinuteBookingDiscountItem | null
  ): FormGroup<LastMinuteBookingDiscountItemForm> => {
    return fb.nonNullable.group({
      beforeDays: [form?.beforeDays ?? 0],
      discount: [form?.discount ?? ''],
      unit: [form?.unit ?? 'руб'],
    });
  },
  earlyBooking: (fb: FormBuilder, form: EarlyBookingDiscountItem | null): FormGroup<EarlyBookingDiscountItemForm> => {
    return fb.nonNullable.group({
      beforeMonths: [form?.beforeMonths ?? 0],
      discount: [form?.discount ?? ''],
      unit: [form?.unit ?? 'руб'],
    });
  },
};

export const createDiscountFormByType = (
  fb: FormBuilder,
  type: keyof CreateFormTypes,
  form: DurationStayDiscountItem | EarlyBookingDiscountItem | LastMinuteBookingDiscountItem | null = null
): FormGroup => {
  return createDiscountFormTypes[type](
    fb,
    form as DurationStayDiscountItem & EarlyBookingDiscountItem & LastMinuteBookingDiscountItem & null
  );
};
