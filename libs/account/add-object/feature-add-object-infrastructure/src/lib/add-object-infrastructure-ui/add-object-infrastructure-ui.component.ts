import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { InfrastructureDataService } from './services/infrastructure-data.service';
import { AccordionDirective } from '@utils/directives';
import { UiFormsInputComponent } from '@ui/forms';
import { InfrastructureCheckboxDirective } from './directives/infrastructure-checkbox.directive';
import { InfrastructureItemVM, InfrastructureVM } from '../types/infrastructure.models';
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
    LetDirective,
  ],
  providers: [InfrastructureDataService],
  templateUrl: './add-object-infrastructure-ui.component.html',
  styleUrl: './add-object-infrastructure-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureUiComponent {
  public readonly data = inject(InfrastructureDataService);
  @Input({ required: true }) form!: FormGroup<InfrastructureVM>;
  @Output() nextEvent = new EventEmitter<void>();

  public onNextClick(): void {
    this.nextEvent.emit();
  }

  public findCheckboxControl(type: string, name: string): InfrastructureItemVM | null {
    const control = (this.form.get(type) as FormArray).controls.find((item) => item.value.name === name);
    return control ? control.value : null;
  }

  public onCheckboxChange(isChecked: boolean, type: string, name: string, distance: string): void {
    if (isChecked) {
      this.addInfrastructureItem(type, name, distance);
    } else {
      this.removeInfrastructureItem(type, name);
    }
  }

  public onDistanceChange(type: string, name: string, distance: string): void {
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).at(index).patchValue({
      name,
      distance,
    });
  }

  private addInfrastructureItem(type: string, name: string, distance: string): void {
    (this.form.get(type) as FormArray).push(
      new FormControl({
        name,
        distance,
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
