import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isCorrectDateValidator } from '@utils/validators';
import { CostForm } from '../../types/cost-form.models';

@Component({
  selector: 'account-add-cost-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-cost-container.component.html',
  styleUrl: './add-cost-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCostContainerComponent {
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<CostForm> = this.fb.nonNullable.group({
    date: ['', [Validators.required, isCorrectDateValidator]],
    amount: ['', [Validators.required]],
    expenseItem: ['', [Validators.required, Validators.minLength(3)]],
    commentary: [''],
    objectsIds: this.fb.nonNullable.array([]) as FormArray<FormControl<number>>,
  });
}
