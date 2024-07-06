import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  InfrastructureListFormVM,
  InfrastructureReachesFormVM,
  InfrastructureFormVM,
} from '../../types/infrastructure-form.models';
import { AddObjectInfrastructureListUiComponent } from '../add-object-infrastructure-list-ui/add-object-infrastructure-list-ui.component';
import { AddObjectInfrastructureReachesUiComponent } from '../add-object-infrastructure-reaches-ui/add-object-infrastructure-reaches-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { LocalStorageObjectFormService } from '@account/add-object/data-access';
import { ObjectInfrastructureVM } from '../../types/infrastructure.models';

@Component({
  selector: 'account-add-object-infrastructure-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectInfrastructureListUiComponent,
    ReactiveFormsModule,
    AddObjectInfrastructureReachesUiComponent,
    AddObjectButtonsUiComponent,
  ],
  templateUrl: './add-object-infrastructure-container.component.html',
  styleUrl: './add-object-infrastructure-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureContainerComponent {
  @Input({ required: true }) form!: FormGroup<InfrastructureFormVM>;
  private readonly router = inject(Router);
  private readonly localStorageObjectFormService = inject(LocalStorageObjectFormService);

  get infrastructureList(): InfrastructureListFormVM {
    return {
      places: this.form.get('places') as FormArray,
      leisure: this.form.get('leisure') as FormArray,
      leisureWater: this.form.get('leisureWater') as FormArray,
      leisureActive: this.form.get('leisureActive') as FormArray,
    };
  }

  get infrastructureReaches(): InfrastructureReachesFormVM {
    return {
      reachByPrivateTransport: this.form.get('reachByPrivateTransport') as FormControl,
      reachByPublicTransport: this.form.get('reachByPublicTransport') as FormControl,
    };
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/characteristics');
  }

  public onSave(): void {
    console.log(1);
    this.localStorageObjectFormService.updateObjectForm({ infrastructure: this.form.value as ObjectInfrastructureVM });
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

  public onAddInfrastructureItem(type: string, name: string): void {
    (this.form.get(type) as FormArray).push(
      new FormControl({
        name,
        distance: '',
      })
    );
  }

  public onRemoveInfrastructureItem(type: string, name: string): void {
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).removeAt(index);
  }
}
