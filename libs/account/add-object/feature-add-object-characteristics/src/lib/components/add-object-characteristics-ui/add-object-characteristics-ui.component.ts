import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { AddObjectCharacteristicsGeneralParametersUiComponent } from '../add-object-characteristics-general-parameters-ui/add-object-characteristics-general-parameters-ui.component';
import { CharacteristicsVM } from '../../types/characteristics.models';
import { FormControlPipe, FormGroupPipe } from '@utils/pipes';
import { AddObjectCharacteristicsRoomsUiComponent } from '../add-object-characteristics-rooms-ui/add-object-characteristics-rooms-ui.component';
import { AddObjectCharacteristicsAmenitiesUiComponent } from '../add-object-characteristics-amenities-ui/add-object-characteristics-amenities-ui.component';
import { AddObjectCharacteristicsDescriptionUiComponent } from '../add-object-characteristics-description-ui/add-object-characteristics-description-ui.component';

@Component({
  selector: 'account-add-object-characteristics-ui',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectCharacteristicsGeneralParametersUiComponent,
    LetDirective,
    FormControlPipe,
    AddObjectCharacteristicsRoomsUiComponent,
    FormGroupPipe,
    AddObjectCharacteristicsAmenitiesUiComponent,
    AddObjectCharacteristicsDescriptionUiComponent,
  ],
  templateUrl: './add-object-characteristics-ui.component.html',
  styleUrl: './add-object-characteristics-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsUiComponent {
  @Input({ required: true }) form!: FormGroup<CharacteristicsVM>;
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Output() nextEvent = new EventEmitter<void>();

  public onNextButtonClick(): void {
    this.nextEvent.emit();
  }
}
