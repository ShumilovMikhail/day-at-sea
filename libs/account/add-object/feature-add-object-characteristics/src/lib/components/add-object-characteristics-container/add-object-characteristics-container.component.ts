import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { AddObjectCharacteristicsUiComponent } from '../add-object-characteristics-ui/add-object-characteristics-ui.component';
import { CharacteristicsVM } from '../../types/characteristics.models';

@Component({
  selector: 'account-add-object-characteristics-container',
  standalone: true,
  imports: [CommonModule, AddObjectCharacteristicsUiComponent],
  templateUrl: './add-object-characteristics-container.component.html',
  styleUrl: './add-object-characteristics-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsContainerComponent {
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input({ required: true }) form!: FormGroup<CharacteristicsVM>;
}
