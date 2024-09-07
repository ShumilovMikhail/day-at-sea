import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isCorrectDateValidator } from '@utils/validators';
import { UiFormsObjectsPickerComponent } from '@ui/forms';
import { CostForm } from '../../types/cost-form.models';
import { FormArrayPipe } from '@utils/pipes';
import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { Observable } from 'rxjs';
import { AddCostFormUiComponent } from '../add-cost-form-ui/add-cost-form-ui.component';
import { Router } from '@angular/router';
import { CostEntity, CostsFacade } from '@account/costs/data-access';

@Component({
  selector: 'account-add-cost-container',
  standalone: true,
  imports: [CommonModule, UiFormsObjectsPickerComponent, FormArrayPipe, AddCostFormUiComponent],
  templateUrl: './add-cost-container.component.html',
  styleUrl: './add-cost-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCostContainerComponent {
  private readonly router = inject(Router);
  private readonly costsFacade = inject(CostsFacade);
  private readonly fb = inject(FormBuilder);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  public readonly myObjects$: Observable<MyObjectsVM> = this.myObjectsFacade.myObjectsVM$;
  public readonly form: FormGroup<CostForm> = this.fb.nonNullable.group({
    date: ['', [Validators.required, isCorrectDateValidator]],
    amount: ['', [Validators.required]],
    expenseItem: ['', [Validators.required, Validators.minLength(3)]],
    commentary: [''],
    objectsIds: this.fb.nonNullable.array([]) as FormArray<FormControl<number>>,
  });

  public onCancel(): void {
    this.router.navigateByUrl('/account/costs');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      this.costsFacade.addCost({
        ...value,
        amount: +value.amount!,
      } as Omit<CostEntity, 'id'>);
    } else {
      throw Error('onSubmit: form is not valid');
    }
  }
}
