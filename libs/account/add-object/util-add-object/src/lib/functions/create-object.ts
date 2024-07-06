import { inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  AgencyObject,
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

export const createObjectForm = (form: AgencyObject | null): FormGroup<ObjectForm> => {
  const fb = inject(FormBuilder);
  return fb.nonNullable.group({
    placement: [form?.placement ?? ''],
    address: [form?.address ?? ''],
    infrastructure: createInfrastructureForm(form?.infrastructure),
    characteristics: createCharacteristicsForm(form?.characteristics),
    photos: createPhotosForm(form?.photos),
    rules: createRulesForm(form?.rules),
    services: fb.array(
      (form?.services.map((service) => new FormControl(service ?? '')) ?? []) as FormControl<string>[]
    ),
    prices: fb.array(
      (form?.prices.map((price) => createPricesItemForm(price)) ?? [
        createPricesItemForm({
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
const createInfrastructureForm = (form: ObjectInfrastructure | undefined): FormGroup<ObjectFormInfrastructure> => {
  const fb = inject(FormBuilder);
  const createInfrastructureItemsArray = (
    infrastructureItems: InfrastructureItem[] | undefined
  ): FormGroup<InfrastructureItemForm>[] | null =>
    infrastructureItems?.map((item) =>
      fb.nonNullable.group({ name: [item.name ?? ''], distance: [item.distance ?? ''] })
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

const createCharacteristicsForm = (form: ObjectCharacteristics | undefined): FormGroup<ObjectFormCharacteristics> => {
  const fb = inject(FormBuilder);
  const createRoomItemsArray = (roomItems: RoomItem[] | undefined): FormGroup<RoomItemForm>[] | null =>
    roomItems?.map((item) =>
      fb.nonNullable.group({
        name: [item.name ?? ''],
        count: [item.count ?? 0],
      })
    ) ?? null;

  return fb.nonNullable.group({
    placementType: [form?.placementType ?? ''],
    square: [form?.square ?? ''],
    floor: [form?.floor ?? ''],
    floorCount: [form?.floorCount ?? ''],
    lift: [form?.lift ?? false],
    attic: [form?.attic ?? false],
    kitchen: [form?.kitchen ?? 'без кухни'],
    repair: [form?.repair ?? 'косметический ремонт'],
    roomCount: [form?.roomCount ?? 0],
    bedroomCount: [form?.bedroomCount ?? ''],
    guestCount: [form?.guestCount ?? 0],
    rooms: fb.nonNullable.group({
      bedrooms: fb.array((createRoomItemsArray(form?.rooms.bedrooms) ?? []) as FormGroup<RoomItemForm>[]),
      bathrooms: fb.array((createRoomItemsArray(form?.rooms.bathrooms) ?? []) as FormGroup<RoomItemForm>[]),
    }),
    waterSupplyType: [form?.waterSupplyType ?? 'Центральное водоснабжение'],
    amenities: fb.nonNullable.group({
      flat: fb.array((form?.amenities.flat.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]),
      bathroom: fb.array(
        (form?.amenities.bathroom.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
      kitchen: fb.array(
        (form?.amenities.kitchen.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
      children: fb.array(
        (form?.amenities.children.map((item) => new FormControl(item ?? '')) ?? []) as FormControl<string>[]
      ),
    }),
    description: [form?.description ?? ''],
  });
};
const createPhotosForm = (form: ObjectPhotos | undefined): FormGroup<ObjectFormPhotos> => {
  const fb = inject(FormBuilder);
  return fb.nonNullable.group({
    generalPhotoIndex: new FormControl(form?.generalPhotoIndex) as FormControl<number | null>,
    photos: fb.array((form?.photos.map((photo) => new FormControl(photo ?? '')) ?? []) as FormControl<string>[]),
  });
};

const createRulesForm = (form: ObjectRules | undefined): FormGroup<ObjectFormRules> => {
  const fb = inject(FormBuilder);
  return fb.nonNullable.group({
    arrivalTime: [form?.arrivalTime ?? '', [Validators.required]],
    departureTime: [form?.departureTime ?? ''],
    earlyArrival: [form?.earlyArrival ?? false],
    lateDeparture: [form?.lateDeparture ?? false],
    rules: fb.array((form?.rules.map((rule) => new FormControl(rule ?? '')) ?? []) as FormControl<string>[]),
    paymentCheckIn: [form?.paymentCheckIn ?? ''],
    pledge: [form?.pledge ?? ''],
    freeCancellation: [form?.freeCancellation ?? '1 день'],
    description: [form?.description ?? ''],
  });
};

const createPricesItemForm = (form: ObjectPricesItem | undefined): FormGroup<ObjectFormPricesItem> => {
  const fb = inject(FormBuilder);
  console.log(form);
  return fb.nonNullable.group({
    name: [form?.name ?? ''],
    price: [form?.price ?? ''],
    minStay: [form?.minStay ?? 0],
    discounts: fb.nonNullable.group({
      durationStay: fb.array(
        (form?.discounts.durationStay.map((item) => createDiscountFormByType('durationStay', item)) ??
          []) as FormGroup<DurationStayDiscountItemForm>[]
      ),
      lastMinuteBooking: fb.array(
        (form?.discounts.lastMinuteBooking.map((item) => createDiscountFormByType('lastMinuteBooking', item)) ??
          []) as FormGroup<LastMinuteBookingDiscountItemForm>[]
      ),
      earlyBooking: fb.array(
        (form?.discounts.earlyBooking.map((item) => createDiscountFormByType('earlyBooking', item)) ??
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
