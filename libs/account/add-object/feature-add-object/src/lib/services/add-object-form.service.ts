import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  DurationStayDiscountItem,
  EarlyBookingDiscountItem,
  InfrastructureItem,
  LastMinuteBookingDiscountItem,
  ObjectForm,
  ObjectPricesItem,
  RoomItem,
} from '../types/object-form.models';

@Injectable({
  providedIn: 'root',
})
export class AddObjectFormService {
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<ObjectForm> = this.fb.nonNullable.group({
    placement: ['Отдельная комната'],
    address: [''],
    infrastructure: this.fb.nonNullable.group({
      places: this.fb.array([] as FormControl<InfrastructureItem>[]),
      leisure: this.fb.array([] as FormControl<InfrastructureItem>[]),
      leisureWater: this.fb.array([] as FormControl<InfrastructureItem>[]),
      leisureActive: this.fb.array([] as FormControl<InfrastructureItem>[]),
      reachByPublicTransport: [''],
      reachByPrivateTransport: [''],
    }),
    characteristics: this.fb.nonNullable.group({
      placementType: ['Комната в квартире'],
      square: [''],
      floor: [''],
      floorCount: [''],
      lift: [false],
      attic: [false],
      kitchen: [''],
      repair: [''],
      roomCount: [''],
      bedroomCount: [''],
      guestCount: [''],
      rooms: this.fb.nonNullable.group({
        bedrooms: this.fb.array([] as FormGroup<RoomItem>[]),
        bathrooms: this.fb.array([] as FormGroup<RoomItem>[]),
      }),
      waterSupplyType: [''],
      amenities: this.fb.nonNullable.group({
        flat: this.fb.array([] as FormControl<string>[]),
        bathroom: this.fb.array([] as FormControl<string>[]),
        kitchen: this.fb.array([] as FormControl<string>[]),
        children: this.fb.array([] as FormControl<string>[]),
      }),
      description: [''],
    }),
    photos: this.fb.nonNullable.group({
      generalPhotoIndex: new FormControl(null) as FormControl<number | null>,
      photos: this.fb.array([] as FormControl<string>[]),
    }),
    rules: this.fb.nonNullable.group({
      arrivalTime: ['', [Validators.required]],
      departureTime: [''],
      earlyArrival: [false],
      lateDeparture: [false],
      rules: this.fb.array([] as FormControl<string>[]),
      paymentCheckIn: [''],
      pledge: [''],
      freeCancellation: ['1 день'],
      description: [''],
    }),
    services: this.fb.array([] as FormControl<string>[]),
    prices: this.fb.array([
      this.fb.nonNullable.group({
        name: ['Цены по умолчанию'],
        price: [''],
        minStay: [0],
        discounts: this.fb.nonNullable.group({
          durationStay: this.fb.array([] as FormGroup<DurationStayDiscountItem>[]),
          lastMinuteBooking: this.fb.array([] as FormGroup<LastMinuteBookingDiscountItem>[]),
          earlyBooking: this.fb.array([] as FormGroup<EarlyBookingDiscountItem>[]),
        }),
        weekendDiscount: this.fb.nonNullable.group({
          price: [''],
          friday: [false],
          saturday: [false],
          sunday: [false],
        }),
        additionalGuests: this.fb.nonNullable.group({
          overGuests: [0],
          surcharge: [''],
          unit: [''],
        }),
        onRequest: [false],
        instant: [false],
      }),
    ] as FormGroup<ObjectPricesItem>[]),
  });
}
