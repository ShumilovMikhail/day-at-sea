import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  ObjectEntity,
  InfrastructureItem,
  ObjectCharacteristics,
  ObjectInfrastructure,
  ObjectPhotos,
  ObjectPricesItem,
  ObjectRules,
  RoomItem,
} from '../types/agency-object.models';
import {
  DurationStayDiscountItemForm,
  EarlyBookingDiscountItemForm,
  InfrastructureItemForm,
  LastMinuteBookingDiscountItemForm,
  ObjectForm,
  ObjectFormCharacteristics,
  ObjectFormInfrastructure,
  ObjectFormPhotos,
  ObjectFormPricesItem,
  ObjectFormRules,
  RoomItemForm,
} from '../types/object-form.models';
import { createDiscountFormByType } from './create-discount';

export const createObjectForm = (fb: FormBuilder, form: Partial<ObjectEntity> | null): FormGroup<ObjectForm> => {
  return fb.nonNullable.group({
    title: [form?.title ?? '', [Validators.required, Validators.minLength(3)]],
    placement: [form?.placement ?? '', [Validators.required]],
    address: [form?.address ?? '', [Validators.required, Validators.minLength(3)]],
    infrastructure: createInfrastructureForm(fb, form?.infrastructure),
    characteristics: createCharacteristicsForm(fb, form?.characteristics),
    photos: createPhotosForm(fb, form?.photos),
    rules: createRulesForm(fb, form?.rules),
    services: fb.array(
      (form?.services?.map((service) => new FormControl(service ?? '')) ?? []) as FormControl<string>[]
    ),
    prices: fb.array(
      (form?.prices?.map((price) => createPricesItemForm(fb, price)) ?? [
        createPricesItemForm(fb, {
          name: 'Цены по умолчанию',
          price: '',
          minStay: 0,
          discounts: {
            durationStay: [],
            lastMinuteBooking: [],
            earlyBooking: [],
          },
          weekendDiscount: {
            price: '',
            friday: false,
            saturday: false,
            sunday: false,
          },
          additionalGuests: {
            overGuests: 0,
            surcharge: '',
            unit: 'руб',
          },
          onRequest: false,
          instant: false,
        }),
      ]) as FormGroup<ObjectFormPricesItem>[]
    ),
  });
};
const createInfrastructureForm = (
  fb: FormBuilder,
  form: ObjectInfrastructure | undefined
): FormGroup<ObjectFormInfrastructure> => {
  const createInfrastructureItemsArray = (
    infrastructureItems: InfrastructureItem[] | undefined
  ): FormGroup<InfrastructureItemForm>[] | null =>
    infrastructureItems?.map((item) =>
      fb.nonNullable.group({
        name: [item?.name ?? '', [Validators.required, Validators.minLength(3)]],
        distance: [item?.distance ?? ''],
      })
    ) ?? null;

  return fb.nonNullable.group({
    places: fb.array((createInfrastructureItemsArray(form?.places) ?? []) as FormGroup<InfrastructureItemForm>[]),
    leisure: fb.array((createInfrastructureItemsArray(form?.leisure) ?? []) as FormGroup<InfrastructureItemForm>[]),
    leisureWater: fb.array(
      (createInfrastructureItemsArray(form?.leisureWater) ?? []) as FormGroup<InfrastructureItemForm>[]
    ),
    leisureActive: fb.array(
      (createInfrastructureItemsArray(form?.leisureActive) ?? []) as FormGroup<InfrastructureItemForm>[]
    ),
    reachByPublicTransport: [form?.reachByPublicTransport ?? ''],
    reachByPrivateTransport: [form?.reachByPrivateTransport ?? ''],
  });
};

const createCharacteristicsForm = (
  fb: FormBuilder,
  form: ObjectCharacteristics | undefined
): FormGroup<ObjectFormCharacteristics> => {
  const createRoomItemsArray = (roomItems: RoomItem[] | undefined): FormGroup<RoomItemForm>[] | null =>
    roomItems?.map((item) =>
      fb.nonNullable.group({
        name: [item.name ?? ''],
        count: [item.count ?? 0],
      })
    ) ?? null;

  return fb.nonNullable.group({
    placementType: [form?.placementType ?? '', [Validators.required, Validators.minLength(3)]],
    square: [form?.square ?? '', [Validators.required, Validators.minLength(1)]],
    floor: [form?.floor ?? '', [Validators.required, Validators.minLength(1)]],
    floorCount: [form?.floorCount ?? ''],
    lift: [form?.lift ?? false],
    attic: [form?.attic ?? false],
    kitchen: [form?.kitchen ?? 'без кухни', [Validators.required, Validators.minLength(3)]],
    repair: [form?.repair ?? 'косметический ремонт', [Validators.required, Validators.minLength(3)]],
    roomCount: [form?.roomCount ?? 0, [Validators.required, Validators.min(0)]],
    bedroomCount: [form?.bedroomCount ?? '', [Validators.required, Validators.min(0)]],
    guestCount: [form?.guestCount ?? 0, [Validators.required, Validators.minLength(1)]],
    rooms: fb.nonNullable.group({
      bedrooms: fb.array((createRoomItemsArray(form?.rooms?.bedrooms) ?? []) as FormGroup<RoomItemForm>[]),
      bathrooms: fb.array((createRoomItemsArray(form?.rooms?.bathrooms) ?? []) as FormGroup<RoomItemForm>[]),
    }),
    waterSupplyType: [
      form?.waterSupplyType ?? 'Центральное водоснабжение',
      [Validators.required, Validators.minLength(3)],
    ],
    amenities: fb.nonNullable.group({
      flat: fb.array((form?.amenities?.flat.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]),
      bathroom: fb.array(
        (form?.amenities.bathroom?.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
      kitchen: fb.array(
        (form?.amenities.kitchen?.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
      children: fb.array(
        (form?.amenities.children?.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
    }),
    description: [form?.description ?? ''],
  });
};

const createPhotosForm = (fb: FormBuilder, form: ObjectPhotos | undefined): FormGroup<ObjectFormPhotos> => {
  return fb.nonNullable.group({
    primaryPhotoIndex: new FormControl(form?.primaryPhotoIndex) as FormControl<number | null>,
    photos: fb.array((form?.photos.map((photo) => new FormControl(photo ?? '')) ?? []) as FormControl<string>[]),
  });
};

const createRulesForm = (fb: FormBuilder, form: ObjectRules | undefined): FormGroup<ObjectFormRules> => {
  return fb.nonNullable.group({
    arrivalTime: [form?.arrivalTime ?? '', [Validators.required, Validators.minLength(4)]],
    departureTime: [form?.departureTime ?? '', [Validators.required, Validators.minLength(4)]],
    earlyArrival: [form?.earlyArrival ?? false],
    lateDeparture: [form?.lateDeparture ?? false],
    rules: fb.array((form?.rules.map((rule) => new FormControl(rule ?? '')) ?? []) as FormControl<string>[]),
    paymentCheckIn: [form?.paymentCheckIn ?? '', [Validators.required, Validators.minLength(1)]],
    pledge: [form?.pledge ?? '', [Validators.required]],
    freeCancellation: [form?.freeCancellation ?? '1 день', [Validators.required, Validators.minLength(1)]],
    description: [form?.description ?? ''],
  });
};

const createPricesItemForm = (fb: FormBuilder, form: ObjectPricesItem | undefined): FormGroup<ObjectFormPricesItem> => {
  return fb.nonNullable.group({
    name: [form?.name ?? ''],
    price: [form?.price ?? '', [Validators.required, Validators.minLength(1)]],
    minStay: [form?.minStay ?? 0, [Validators.required, Validators.minLength(1)]],
    discounts: fb.nonNullable.group({
      durationStay: fb.array(
        (form?.discounts?.durationStay.map((item) => createDiscountFormByType(fb, 'durationStay', item)) ??
          []) as FormGroup<DurationStayDiscountItemForm>[]
      ),
      lastMinuteBooking: fb.array(
        (form?.discounts?.lastMinuteBooking.map((item) => createDiscountFormByType(fb, 'lastMinuteBooking', item)) ??
          []) as FormGroup<LastMinuteBookingDiscountItemForm>[]
      ),
      earlyBooking: fb.array(
        (form?.discounts?.earlyBooking.map((item) => createDiscountFormByType(fb, 'earlyBooking', item)) ??
          []) as FormGroup<EarlyBookingDiscountItemForm>[]
      ),
    }),
    weekendDiscount: fb.nonNullable.group({
      price: [form?.weekendDiscount.price ?? ''],
      friday: [form?.weekendDiscount.friday ?? false],
      saturday: [form?.weekendDiscount.saturday ?? false],
      sunday: [form?.weekendDiscount.sunday ?? false],
    }),
    additionalGuests: fb.nonNullable.group({
      overGuests: [form?.additionalGuests.overGuests ?? 0],
      surcharge: [form?.additionalGuests.surcharge ?? ''],
      unit: [form?.additionalGuests.unit ?? 'руб'],
    }),
    onRequest: [form?.onRequest ?? false],
    instant: [form?.onRequest ?? false],
  });
};
