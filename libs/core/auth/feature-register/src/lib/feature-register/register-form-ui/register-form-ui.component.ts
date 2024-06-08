import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsPasswordComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

interface RegisterForm {
  login: FormControl<string>;
  email: FormControl<string>;
  fullName: FormControl<string>;
  password: FormControl<string>;
}
const STEP_COUNT = 3;

@Component({
  selector: 'auth-register-form-ui',
  standalone: true,
  imports: [
    CommonModule,
    UiFormsInputComponent,
    FormControlPipe,
    UiFormsPasswordComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form-ui.component.html',
  styleUrl: './register-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormUiComponent {
  @Input({ required: true }) form!: FormGroup<RegisterForm>;
  @Output() submitEvent = new EventEmitter<void>();
  public step = 1;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public onNextStep(): void {
    if (this.step === STEP_COUNT) {
      this.submitEvent.emit();
      return;
    }
    this.step = this.step === STEP_COUNT ? this.step : ++this.step;
    this.changeDetectorRef.detectChanges();
  }
}
