import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';

import { ServicesListDataService } from './services/services-list-data.service';

@Component({
  selector: 'account-add-object-services-list-ui',
  standalone: true,
  imports: [CommonModule],
  providers: [ServicesListDataService],
  templateUrl: './add-object-services-list-ui.component.html',
  styleUrl: './add-object-services-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectServicesListUiComponent {
  @Input({ required: true }) servicesArray!: FormArray<FormControl<string>>;
  @Output() addServiceEvent = new EventEmitter<string>();
  @Output() removeServiceEvent = new EventEmitter<string>();
  private readonly servicesListDataService = inject(ServicesListDataService);
  public readonly servicesList = this.servicesListDataService.list;

  public onCheckboxChange(isChecked: boolean, service: string): void {
    if (isChecked) {
      this.addServiceEvent.emit(service);
    } else {
      this.removeServiceEvent.emit(service);
    }
  }

  public hasService(service: string): boolean {
    console.log(this.servicesArray.value.includes(service));
    return this.servicesArray.value.includes(service);
  }
}
