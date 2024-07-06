import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { InfrastructureDataService } from './services/infrastructure-data.service';
import { InfrastructureItemFormVM, InfrastructureListFormVM } from '../../types/infrastructure-form.models';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-add-object-infrastructure-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, LetDirective],
  providers: [InfrastructureDataService],
  templateUrl: './add-object-infrastructure-list-ui.component.html',
  styleUrl: './add-object-infrastructure-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureListUiComponent {
  @Input({ required: true }) infrastructureList!: InfrastructureListFormVM;
  @Output() addInfrastructureItemEvent = new EventEmitter<{ type: string; name: string }>();
  @Output() removeInfrastructureItemEvent = new EventEmitter<{ type: string; name: string }>();
  @Output() distanceChangeEvent = new EventEmitter<{ type: string; name: string; distance: string }>();
  public readonly data = inject(InfrastructureDataService);

  public findCheckboxControl(type: string, name: string): InfrastructureItemFormVM | null {
    const control = (this.infrastructureList[type as keyof InfrastructureListFormVM] as FormArray).controls.find(
      (item) => item.value.name === name
    );
    return control ? control.value : null;
  }

  public onCheckboxChange(isChecked: boolean, type: string, name: string): void {
    if (isChecked) {
      this.addInfrastructureItemEvent.emit({ type, name });
    } else {
      this.removeInfrastructureItemEvent.emit({ type, name });
    }
  }

  public onDistanceChange(type: string, name: string, distance: string): void {
    this.distanceChangeEvent.emit({ type, name, distance });
  }
}
