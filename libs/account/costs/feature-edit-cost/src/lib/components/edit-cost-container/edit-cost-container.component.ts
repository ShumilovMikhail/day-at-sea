import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isCorrectDateValidator } from '@utils/validators';
import { UiFormsObjectsPickerComponent } from '@ui/forms';
import { CostForm } from '../../types/cost-form.models';
import { FormArrayPipe } from '@utils/pipes';
import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { map, Observable, take } from 'rxjs';
import { EditCostFormUiComponent } from '../edit-cost-form-ui/edit-cost-form-ui.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CostEntity, CostsEntity, CostsFacade } from '@account/costs/data-access';

@Component({
  selector: 'account-edit-cost-container',
  standalone: true,
  imports: [CommonModule, UiFormsObjectsPickerComponent, FormArrayPipe, EditCostFormUiComponent],
  templateUrl: './edit-cost-container.component.html',
  styleUrl: './edit-cost-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCostContainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly costsFacade = inject(CostsFacade);
  private readonly fb = inject(FormBuilder);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private cost!: CostEntity;
  public readonly myObjects$: Observable<MyObjectsVM> = this.myObjectsFacade.myObjectsVM$;
  public form!: FormGroup<CostForm>;

  ngOnInit(): void {
    this.costsFacade.costs$
      .pipe(
        take(1),
        map((costs: CostsEntity) => costs.find((cost) => cost.id === this.route.snapshot.params['id']))
      )
      .subscribe((cost: CostEntity | undefined) => {
        if (!cost) throw Error('Edit cost: cost is undefined');
        this.form = this.fb.nonNullable.group({
          date: [cost.date, [Validators.required, isCorrectDateValidator]],
          amount: [cost.amount.toString(), [Validators.required]],
          expenseItem: [cost.expenseItem, [Validators.required, Validators.minLength(3)]],
          commentary: [cost.commentary],
          objectsIds: this.fb.nonNullable.array(cost.objectsIds) as FormArray<FormControl<number>>,
        });
        this.cost = cost;
        this.changeDetector.detectChanges();
      });
  }

  public onCancel(): void {
    this.router.navigateByUrl('/account/costs');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      this.costsFacade.updateCost({
        ...this.cost,
        ...value,
        amount: +value.amount!,
      });
    } else {
      throw Error('onSubmit: form is not valid');
    }
  }
}
