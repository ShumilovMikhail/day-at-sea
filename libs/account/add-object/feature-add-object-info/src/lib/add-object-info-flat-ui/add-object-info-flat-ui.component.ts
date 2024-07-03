import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { UiFormsAddressContainerComponent, UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { houseNumberValidator } from '@utils/validators';

@Component({
  selector: 'account-add-object-info-flat-ui',
  standalone: true,
  imports: [
    CommonModule,
    UiFormsAddressContainerComponent,
    FormControlPipe,
    UiFormsInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-object-info-flat-ui.component.html',
  styleUrl: './add-object-info-flat-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfoFlatUiComponent implements OnInit {
  @Input() isLoading = false;
  @Input({ required: true }) addressControl!: FormControl<string>;
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Output() nextButtonClickEvent = new EventEmitter<void>();
  private readonly fb = inject(FormBuilder);
  public form = this.fb.group({
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required, houseNumberValidator()]],
    corpus: [''],
    floor: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.placementControl.patchValue('Квартира/апартаменты');
  }

  public onNextButtonClick(): void {
    const formValue = this.form.value;
    const address = `${formValue.city}, ${formValue.street}, дом ${formValue.house}, ${
      formValue.corpus ? `корпус ${formValue.corpus}, ` : ''
    }квартира ${formValue.floor}`;

    this.addressControl.patchValue(address);
    this.nextButtonClickEvent.emit();
  }
}
