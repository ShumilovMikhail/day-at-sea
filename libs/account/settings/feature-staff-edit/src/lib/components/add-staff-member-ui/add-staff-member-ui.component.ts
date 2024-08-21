import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddStaffMember, AddStaffMemberForm } from '../../types/add-staff-member.models';
import { fullNameValidator } from '@utils/validators';
import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-staff-member-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe],
  templateUrl: './add-staff-member-ui.component.html',
  styleUrl: './add-staff-member-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStaffMemberUiComponent {
  @Output() submitEvent = new EventEmitter<AddStaffMember>();
  isLoading = input<boolean>();
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<AddStaffMemberForm> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(5), fullNameValidator()]],
    role: ['', [Validators.required, Validators.minLength(3)]],
  });

  public onSubmit(): void {
    this.submitEvent.emit(this.form.value as AddStaffMember);
  }
}
