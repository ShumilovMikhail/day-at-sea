import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RequisitesForm } from '../types/requisites.models';
import { UiFormsAddressContainerComponent, UiFormsInputComponent, UiFormsPhoneComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-requisites-edit-ui',
  standalone: true,
  imports: [
    CommonModule,
    UiFormsInputComponent,
    FormControlPipe,
    UiFormsPhoneComponent,
    UiFormsAddressContainerComponent,
    NgOptimizedImage,
  ],
  templateUrl: './requisites-edit-ui.component.html',
  styleUrl: './requisites-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditUiComponent {
  public readonly formRequisites = input<FormGroup<RequisitesForm>>();
  public readonly isLoading = input<boolean>(false);
  public readonly cancelEvent = output<void>();
  public readonly submitEvent = output<void>();
  public readonly loadLogoEvent = output<File>();

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
