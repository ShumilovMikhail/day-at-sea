import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingForm, BookingFormInstalment } from '../../types/add-booking.models';
import { departureDateValidator } from '../../validators/departure-date.validator';
import { AddBookingInfoUiComponent } from '../add-booking-info-ui/add-booking-info-ui.component';
import { LetDirective } from '@ngrx/component';
import { FormControlPipe, FormGroupPipe } from '@utils/pipes';
import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { map, Observable } from 'rxjs';
import { AddBookingClientUiComponent } from '../add-booking-client-ui/add-booking-client-ui.component';
import { fullNameValidator, isNotNumberValidator } from '@utils/validators';
import { AddBookingAmountUiComponent } from '../add-booking-amount-ui/add-booking-amount-ui.component';

@Component({
  selector: 'account-add-booking-container',
  standalone: true,
  imports: [
    CommonModule,
    AddBookingInfoUiComponent,
    LetDirective,
    FormControlPipe,
    AddBookingClientUiComponent,
    FormGroupPipe,
    AddBookingAmountUiComponent,
  ],
  templateUrl: './add-booking-container.component.html',
  styleUrl: './add-booking-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingContainerComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  public readonly form: FormGroup<BookingForm> = this.fb.nonNullable.group({
    agencyObjectId: [null as number | null, [Validators.required]],
    arrival: ['', [Validators.required]],
    departure: ['', [Validators.required]],
    guestCount: [0, [Validators.required, Validators.min(0)]],
    dailyPrice: [0, [Validators.required, Validators.min(1), isNotNumberValidator()]],
    amount: [0, [Validators.required, Validators.min(1), isNotNumberValidator()]],
    pledge: [0, [Validators.required, Validators.min(1), isNotNumberValidator()]],
    paid: [0, [Validators.required, isNotNumberValidator()]],
    note: [''],
    source: [''],
    status: ['', [Validators.required]],
    instalments: this.fb.array([] as FormGroup<BookingFormInstalment>[]),
    client: this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(3), fullNameValidator()]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    }),
  });
  public readonly myObjectsList$: Observable<string[]> = this.myObjectsFacade.myObjectsVM$.pipe(
    map((myObjects: MyObjectsVM) => myObjects.map((myObject) => myObject.title))
  );

  ngOnInit(): void {
    this.form.get('departure')?.addValidators(departureDateValidator(this.form.get('arrival')!));
  }
}
