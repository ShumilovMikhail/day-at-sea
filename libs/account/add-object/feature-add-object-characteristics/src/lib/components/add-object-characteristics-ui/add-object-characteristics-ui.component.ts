import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { AddObjectCharacteristicsGeneralParametersUiComponent } from '../add-object-characteristics-general-parameters-ui/add-object-characteristics-general-parameters-ui.component';
import { CharacteristicsVM } from '../../types/characteristics.models';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-characteristics-ui',
  standalone: true,
  imports: [CommonModule, AddObjectCharacteristicsGeneralParametersUiComponent, LetDirective, FormControlPipe],
  templateUrl: './add-object-characteristics-ui.component.html',
  styleUrl: './add-object-characteristics-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsUiComponent {
  @Input({ required: true }) form!: FormGroup<CharacteristicsVM>;
  @Input({ required: true }) placementControl!: FormControl<string>;
}