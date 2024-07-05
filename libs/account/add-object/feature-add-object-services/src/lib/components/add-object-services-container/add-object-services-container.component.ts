import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';

import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { AddObjectServicesListUiComponent } from '../add-object-services-list-ui/add-object-services-list-ui.component';

@Component({
  selector: 'account-add-object-services-container',
  standalone: true,
  imports: [CommonModule, AddObjectButtonsUiComponent, AddObjectServicesListUiComponent],
  templateUrl: './add-object-services-container.component.html',
  styleUrl: './add-object-services-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectServicesContainerComponent {
  @Input({ required: true }) servicesArray!: FormArray<FormControl<string>>;
  private readonly router = inject(Router);

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/prices');
  }

  public onAddService(service: string): void {
    this.servicesArray.push(new FormControl(service) as FormControl<string>);
  }

  public onRemoveService(service: string): void {
    const index = this.servicesArray.controls.findIndex((control) => control.value === service);
    if (index === -1) {
      throw Error('form services list: the service is not on the list');
    }
    this.servicesArray.removeAt(index);
  }
}
