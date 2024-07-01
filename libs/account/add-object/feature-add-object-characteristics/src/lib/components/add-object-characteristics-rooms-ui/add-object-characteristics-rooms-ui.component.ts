import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomsVM } from '../../types/rooms.models';
import { UiFormsCounterComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { RoomItemVM } from '../../types/characteristics.models';

@Component({
  selector: 'account-add-object-characteristics-rooms-ui',
  standalone: true,
  imports: [CommonModule, UiFormsCounterComponent, FormControlPipe, UiFormsSelectComponent, ReactiveFormsModule],
  templateUrl: './add-object-characteristics-rooms-ui.component.html',
  styleUrl: './add-object-characteristics-rooms-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsRoomsUiComponent {
  @Input({ required: true }) form!: RoomsVM;
  @ViewChild('guestCounter') guestCounter!: UiFormsCounterComponent;
  public guestCounterDisabled = false;

  get bedrooms(): FormArray<FormGroup<RoomItemVM>> {
    return this.form.rooms.get('bedrooms') as FormArray as FormArray<FormGroup<RoomItemVM>>;
  }

  get bathrooms(): FormArray<FormGroup<RoomItemVM>> {
    return this.form.rooms.get('bathrooms') as FormArray as FormArray<FormGroup<RoomItemVM>>;
  }

  public onAddBedroom(): void {
    this.bedrooms.push(
      new FormGroup({
        name: new FormControl('', { nonNullable: true }),
        count: new FormControl('', { nonNullable: true }),
      })
    );
  }

  public onRemoveBedroom(index: number): void {
    this.bedrooms.removeAt(index);
  }

  public onAddBathroom(): void {
    this.bathrooms.push(
      new FormGroup({
        name: new FormControl('', { nonNullable: true }),
        count: new FormControl('', { nonNullable: true }),
      })
    );
  }

  public onRemoveBathroom(index: number): void {
    this.bathrooms.removeAt(index);
  }

  public onCheckboxClick(isChecked: boolean): void {
    this.guestCounterDisabled = isChecked;
    this.form.guestCount.patchValue(isChecked ? '5 и более' : `${this.guestCounter.count}`);
  }
}
