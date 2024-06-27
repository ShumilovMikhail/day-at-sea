import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AddObjectInfoContainerComponent } from '@account/add-object/feature-add-object-info';
import { FormControlPipe } from '@utils/pipes';
import { AddObjectInfrastructureContainerComponent } from '@account/add-object/feature-add-object-infrastructure';
import { InfrastructureItem, ObjectForm, ObjectFormInfrastructure, RoomItem } from '../types/object-form.models';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [CommonModule, AddObjectInfoContainerComponent, FormControlPipe, AddObjectInfrastructureContainerComponent],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<ObjectForm> = this.fb.nonNullable.group({
    placement: [''],
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
      placementType: [''],
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
        bedrooms: this.fb.array([] as FormControl<RoomItem>[]),
        bathrooms: this.fb.array([] as FormControl<RoomItem>[]),
      }),
      waterSupplyType: [''],
      amenities: this.fb.array([] as FormControl<string>[]),
      description: [''],
    }),
    photos: this.fb.array([] as FormControl<string>[]),
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
  public step: string | null = null;

  public get infrastructureForm(): FormGroup<ObjectFormInfrastructure> {
    return this.form.get('infrastructure') as FormGroup<ObjectFormInfrastructure>;
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.step = params['step'];
    });
  }
}
