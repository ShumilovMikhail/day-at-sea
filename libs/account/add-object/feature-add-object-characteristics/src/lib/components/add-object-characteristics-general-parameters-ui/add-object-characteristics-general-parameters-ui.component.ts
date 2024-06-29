import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';
import { GeneralParametersVM } from '../../types/general-parameters.models';
import { PlacementTypeDataService } from '@account/add-object/util';
import { UiCommonNoteComponent } from '@ui/common';

@Component({
  selector: 'account-add-object-characteristics-general-parameters-ui',
  standalone: true,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsInputComponent, ReactiveFormsModule, UiCommonNoteComponent],
  providers: [PlacementTypeDataService],
  templateUrl: './add-object-characteristics-general-parameters-ui.component.html',
  styleUrl: './add-object-characteristics-general-parameters-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsGeneralParametersUiComponent {
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input({ required: true }) form!: GeneralParametersVM;
  private readonly placementTypeData = inject(PlacementTypeDataService);
  get placementList(): string[] {
    const placement = this.placementControl.value;
    return this.placementTypeData.typesData[placement];
  }
}
