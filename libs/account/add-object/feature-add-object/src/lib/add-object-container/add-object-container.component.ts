import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';

import { AddObjectInfoContainerComponent } from '@account/add-object/feature-add-object-info';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [CommonModule, AddObjectInfoContainerComponent, FormControlPipe],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    placement: [''],
    address: [''],
    infrastructure: [[]],
    characteristics: this.fb.group({
      type: [''],
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
      rooms: {
        bedrooms: [[]],
        bathrooms: [[]],
      },
      waterSupplyType: [''],
      amenities: [[]],
      description: [''],
    }),
    photos: [[]],
    rules: {
      arrivalTime: [''],
      departureTime: [''],
      earlyArrival: [false],
      lateDeparture: [false],
      rules: [[]],
      paymentCheckIn: [''],
      pledge: [''],
      freeCancellation: [''],
      description: [''],
    },
    services: [[]],
    prices: {
      default: {
        price: [''],
        minStay: [''],
        discounts: [[]],
        weekendDiscount: {
          price: [''],
          friday: [false],
          saturday: [false],
          sunday: [false],
        },
        additionalGuests: {
          moreGuests: [''],
          surcharge: [''],
          unit: [''],
        },
        onRequest: [false],
        instant: [false],
      },
      seasons: [[]],
    },
  });
  public step: string | null = null;

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.step = params['step'];
    });
  }
}
