import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RequisitesForm } from '../types/requisites.models';
import { UiFormsAddressComponent, UiFormsInputComponent, UiFormsPhoneComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-requisites-edit-ui',
  standalone: true,
  imports: [
    CommonModule,
    UiFormsInputComponent,
    FormControlPipe,
    UiFormsPhoneComponent,
    UiFormsAddressComponent,
    NgOptimizedImage,
  ],
  templateUrl: './requisites-edit-ui.component.html',
  styleUrl: './requisites-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditUiComponent {
  @Input({ required: true }) formRequisites!: FormGroup<RequisitesForm>;
  @Input() isLoading = false;
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  @Output() loadLogoEvent = new EventEmitter<File>();

  public onLogoChange(event: Event): void {
    const loadedLogo = (event.target as HTMLInputElement).files![0];
    if (loadedLogo) {
      this.loadLogoEvent.emit(loadedLogo);
    }
  }

  public onCancel(): void {
    this.cancelEvent.emit();
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
