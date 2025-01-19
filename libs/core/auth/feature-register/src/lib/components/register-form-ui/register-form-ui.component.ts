import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsPasswordComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  fullName: FormControl<string>;
  password: FormControl<string>;
}
const STEP_COUNT = 3;

@Component({
  selector: 'auth-register-form-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, FormControlPipe, UiFormsPasswordComponent, ReactiveFormsModule],
  templateUrl: './register-form-ui.component.html',
  styleUrl: './register-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormUiComponent {
  @Input({ required: true }) form!: FormGroup<RegisterForm>;
  public isLoading = input<boolean>();
  public submitEvent = output<void>();
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public step = signal<number>(1);

  public onNextStep(): void {
    let step = this.step();
    if (step === STEP_COUNT) {
      this.submitEvent.emit();
      return;
    }
    step = step === STEP_COUNT ? step : ++step;
    this.step.set(step);
    this.changeDetectorRef.detectChanges();
  }

  public onPreviousStep(): void {
    let step = this.step();
    if (step === 1) {
      return;
    }
    step = step === 1 ? step : --step;
    this.step.set(step);
    this.changeDetectorRef.detectChanges();
  }
}
