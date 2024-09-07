import { FormArray, FormControl } from '@angular/forms';

export interface CostForm {
  date: FormControl<string>;
  amount: FormControl<string>;
  expenseItem: FormControl<string>;
  commentary: FormControl<string>;
  objectsIds: FormArray<FormControl<number>>;
}
