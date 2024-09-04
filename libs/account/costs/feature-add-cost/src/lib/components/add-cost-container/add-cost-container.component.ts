import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isCorrectDateValidator } from '@utils/validators';
import { UiFormsObjectsPickerComponent } from '@ui/forms';
import { CostForm } from '../../types/cost-form.models';
import { FormArrayPipe } from '@utils/pipes';
import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-add-cost-container',
  standalone: true,
  imports: [CommonModule, UiFormsObjectsPickerComponent, FormArrayPipe],
  templateUrl: './add-cost-container.component.html',
  styleUrl: './add-cost-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCostContainerComponent {
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
}
