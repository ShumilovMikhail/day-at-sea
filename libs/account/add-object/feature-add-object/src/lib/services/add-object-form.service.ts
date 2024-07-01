import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InfrastructureItem, ObjectForm, RoomItem } from '../types/object-form.models';

@Injectable({
  providedIn: 'root',
})
export class AddObjectFormService {
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<ObjectForm> = this.fb.nonNullable.group({
    placement: ['Отдельная комната'],
    address: [''],
    infrastructure: this.fb.nonNullable.group({
      placesDistance: this.fb.array([] as FormControl<InfrastructureItem>[]),
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
      arrivalTime: [''],
      departureTime: [''],
      earlyArrival: [false],
      lateDeparture: [false],
      rules: this.fb.array([] as FormControl<string>[]),
      paymentCheckIn: [''],
      pledge: [''],
      freeCancellation: [''],
      description: [''],
    }),
    services: this.fb.array([] as FormControl<string>[]),
    // prices: {
    //   default: {
    //     price: [''],
    //     minStay: [''],
    //     discounts: [[]],
    //     weekendDiscount: {
    //       price: [''],
    //       friday: [false],
    //       saturday: [false],
    //       sunday: [false],
    //     },
    //     additionalGuests: {
    //       moreGuests: [''],
    //       surcharge: [''],
    //       unit: [''],
    //     },
    //     onRequest: [false],
    //     instant: [false],
    //   },
    //   seasons: [[]],
    // },
  });
}
