import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { PhonePipe } from '../pipes/phone.pipe';
import { PhoneDirective } from '../directives/phone.directive';

@Component({
  selector: 'ui-forms-phone',
  standalone: true,
  templateUrl: './ui-forms-phone.component.html',
  styleUrl: './ui-forms-phone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, PhonePipe, PhoneDirective],
})
export class UiFormsPhoneComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;

  public onFocus(): void {
    this.control.markAsUntouched();
  }

  onReset() {
    this.control.patchValue('');
  }
}
