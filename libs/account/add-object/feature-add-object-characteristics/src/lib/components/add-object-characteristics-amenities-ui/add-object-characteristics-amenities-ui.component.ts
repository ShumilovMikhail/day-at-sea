import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AmenitiesVM } from '../../types/amenities.models';
import { AmenitiesDataService } from './services/amenities-data.service';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-add-object-characteristics-amenities-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AccordionDirective],
  providers: [AmenitiesDataService],
  templateUrl: './add-object-characteristics-amenities-ui.component.html',
  styleUrl: './add-object-characteristics-amenities-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsAmenitiesUiComponent {
  @Input({ required: true }) form!: FormGroup<AmenitiesVM>;
  public readonly amenitiesDataService = inject(AmenitiesDataService);

  public changeAmenitiesCheckbox(isChecked: boolean, type: string, name: string): void {
    if (isChecked) {
      this.addAmenities(type, name);
    } else {
      this.removeAmenities(type, name);
    }
  }

  public hasAmenities(type: string, name: string): boolean {
    return (this.form.get(type) as FormArray).value.includes(name);
  }

  private addAmenities(type: string, name: string): void {
    (this.form.get(type) as FormArray).push(new FormControl(name));
  }

  private removeAmenities(type: string, name: string): void {
    const index = (this.form.get(type) as FormArray).value.findIndex((nameControl: string) => nameControl === name);
    if (index !== -1) {
      (this.form.get(type) as FormArray).removeAt(index);
      return;
    }
    throw Error('characteristicForm remove amenities: amenities not found');
  }
}
