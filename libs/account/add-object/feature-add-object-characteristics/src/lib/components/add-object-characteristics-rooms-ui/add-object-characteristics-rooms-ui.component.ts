import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomsFormVM, RoomItemFormVM } from '../../types/characteristics-form.models';
import { UiFormsCounterComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-characteristics-rooms-ui',
  standalone: true,
  imports: [CommonModule, UiFormsCounterComponent, FormControlPipe, UiFormsSelectComponent, ReactiveFormsModule],
  templateUrl: './add-object-characteristics-rooms-ui.component.html',
  styleUrl: './add-object-characteristics-rooms-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsRoomsUiComponent implements OnInit {
  @Input({ required: true }) form!: RoomsFormVM;
  @ViewChild('guestCounter') guestCounter!: UiFormsCounterComponent;
  public guestCounterDisabled = false;

  ngOnInit(): void {
    this.guestCounterDisabled = this.form.guestCount.value === '5 и более';
  }

  get bedrooms(): FormArray<FormGroup<RoomItemFormVM>> {
    return this.form.rooms.get('bedrooms') as FormArray as FormArray<FormGroup<RoomItemFormVM>>;
  }

  get bathrooms(): FormArray<FormGroup<RoomItemFormVM>> {
    return this.form.rooms.get('bathrooms') as FormArray as FormArray<FormGroup<RoomItemFormVM>>;
  }

  public onAddBedroom(): void {
    this.bedrooms.push(
      new FormGroup({
        name: new FormControl('Односпальная кровать', { nonNullable: true }),
        count: new FormControl(0, { nonNullable: true }),
      })
    );
  }

  public onRemoveBedroom(index: number): void {
    this.bedrooms.removeAt(index);
  }

  public onAddBathroom(): void {
    this.bathrooms.push(
      new FormGroup({
        name: new FormControl('Ванная комната совмещенная с туалетом', { nonNullable: true }),
        count: new FormControl(0, { nonNullable: true }),
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
