import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InfrastructureDataService } from './services/infrastructure-data.service';
import { AccordionDirective } from '@utils/directives';
import { UiFormsInputComponent } from '@ui/forms';
import { InfrastructureCheckboxDirective } from './directives/infrastructure-checkbox.directive';
import { InfrastructureVM } from '../types/infrastructure.models';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-infrastructure-ui',
  standalone: true,
  imports: [
    CommonModule,
    AccordionDirective,
    UiFormsInputComponent,
    InfrastructureCheckboxDirective,
    ReactiveFormsModule,
    FormControlPipe,
  ],
  providers: [InfrastructureDataService],
  templateUrl: './add-object-infrastructure-ui.component.html',
  styleUrl: './add-object-infrastructure-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureUiComponent {
  public readonly data = inject(InfrastructureDataService);
  @Input({ required: true }) form!: FormGroup<InfrastructureVM>;

  public onCheckboxChange(event: Event, type: string, name: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.addInfrastructureItem(type, name);
    } else {
      this.removeInfrastructureItem(type, name);
    }
  }

  public onDistanceChange(type: string, name: string, event: Event): void {
    const distance = (event.target as HTMLInputElement).value;
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).at(index).patchValue({
      name,
      distance,
    });
  }

  private addInfrastructureItem(type: string, name: string): void {
    (this.form.get(type) as FormArray).push(
      new FormControl({
        name,
        distance: 0,
      })
    );
  }

  private removeInfrastructureItem(type: string, name: string): void {
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).removeAt(index);
  }
}
