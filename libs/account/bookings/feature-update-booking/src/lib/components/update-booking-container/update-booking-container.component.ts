import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LetDirective } from '@ngrx/component';

import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { BookingEntity, BookingsFacade, SaveBookingEntity } from '@account/bookings/data-access';
import { isNotNumberValidator } from '@utils/validators';
import { BookingForm, BookingFormInstalment, InstalmentVM } from '../../types/update-booking.models';
import { departureDateValidator } from '../../validators/departure-date.validator';
import { UpdateBookingAmountUiComponent } from '../update-booking-amount-ui/update-booking-amount-ui.component';
import { UpdateBookingInfoUiComponent } from '../update-booking-info-ui/update-booking-info-ui.component';
import { UpdateBookingInstalmentsUiComponent } from '../update-booking-instalments-ui/update-booking-instalments-ui.component';
import { UpdateBookingAddInstalmentUiComponent } from '../update-booking-add-instalment-ui/update-booking-add-instalment-ui.component';
import { UpdateBookingNoteUiComponent } from '../update-booking-note-ui/update-booking-note-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-update-booking-container',
  standalone: true,
  imports: [
    CommonModule,
    UpdateBookingAmountUiComponent,
    UpdateBookingInfoUiComponent,
    UpdateBookingInstalmentsUiComponent,
    UpdateBookingAddInstalmentUiComponent,
    UpdateBookingNoteUiComponent,
    UiIndicatorsLoaderComponent,
    RouterLink,
    FormControlPipe,
    LetDirective,
  ],
  templateUrl: './update-booking-container.component.html',
  styleUrl: './update-booking-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingContainerComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private readonly bookingsFacade = inject(BookingsFacade);
  private booking!: BookingEntity;
  public readonly myObjectsList$: Observable<string[]> = this.myObjectsFacade.myObjectsVM$.pipe(
    map((myObjects: MyObjectsVM) => myObjects.map((myObject) => myObject.title))
  );
  public readonly loading$: Observable<boolean> = this.bookingsFacade.loading$;
  public readonly bookingId = this.route.snapshot.params['id'];
  public form!: FormGroup<BookingForm>;
  public modalOpen = false;

  ngOnInit(): void {
    this.bookingsFacade.bookings$
      .pipe(
        take(1),
        map((bookings) => bookings.find((booking) => booking.id === this.bookingId))
      )
      .subscribe((booking: BookingEntity | undefined) => {
        if (!booking) throw Error('Update booking: booking is undefined');
        this.booking = booking;
        this.initializeForm();
      });
  }

  public onSave(): void {
    if (this.form.invalid) {
      throw Error('Add booking save: Form is not valid');
    }
    this.myObjectsFacade.myObjectsVM$.pipe(take(1)).subscribe((myObjects) => {
      const booking = this.form.value;
      const agencyObject = myObjects.find((myObject) => myObject.title === booking.agencyObjectTitle);
      if (agencyObject) {
        delete booking['agencyObjectTitle'];
        this.bookingsFacade.updateBooking({
          ...this.form.value,
          id: this.booking.id,
          agencyObjectId: agencyObject.id,
          client: this.booking.clientId,
        } as SaveBookingEntity);
      }
    });
  }

  public onToggleModal(modalOpen: boolean): void {
    this.modalOpen = modalOpen;
  }

  public onAddInstalment(instalment: FormGroup<BookingFormInstalment>) {
    (this.form.get('instalments') as FormArray).push(instalment);
    this.modalOpen = false;
    this.calcPaid();
  }

  public onDeleteInstalment(index: number): void {
    (this.form.get('instalments') as FormArray).removeAt(index);
    this.calcPaid();
  }

  private calcPaid(): void {
    const instalments: number = (this.form.get('instalments')!.value as InstalmentVM[]).reduce(
      (sum, item) => sum + +item.amount,
      0
    );
    this.form.get('paid')?.patchValue(instalments);
  }

  private initializeForm(): void {
    const booking = this.booking;
    this.myObjectsFacade.myObjectsVM$.pipe(take(1)).subscribe((myObjects) => {
      const agencyObject = myObjects.find((myObject) => myObject.id === booking.agencyObjectId);
      if (!agencyObject) return;
      this.form = this.fb.nonNullable.group({
        agencyObjectTitle: [agencyObject.title, [Validators.required]],
        arrival: [booking.arrival, [Validators.required]],
        departure: [booking.departure, [Validators.required]],
        guestCount: [booking.guestCount, [Validators.required, Validators.min(0)]],
        dailyPrice: [booking.dailyPrice, [Validators.required, Validators.min(1), isNotNumberValidator()]],
        amount: [booking.amount, [Validators.required, Validators.min(1), isNotNumberValidator()]],
        pledge: [booking.pledge, [Validators.required, Validators.min(1), isNotNumberValidator()]],
        paid: [booking.paid, [Validators.required, isNotNumberValidator()]],
        note: [booking.note],
        source: [booking.source],
        status: [booking.status, [Validators.required]],
        instalments: this.fb.array(
          booking.instalments.map((booking) =>
            this.fb.nonNullable.group({
              date: [booking.date, [Validators.required]],
              amount: [booking.amount, [Validators.required, Validators.min(1)]],
              commentary: [booking.commentary],
            })
          )
        ),
      });
      this.form.get('departure')?.addValidators(departureDateValidator(this.form.get('arrival')!));
      this.changeDetectorRef.detectChanges();
    });
  }
}
