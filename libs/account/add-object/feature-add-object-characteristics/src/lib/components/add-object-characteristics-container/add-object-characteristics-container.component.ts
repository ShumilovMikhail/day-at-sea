import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { CharacteristicsVM } from '../../types/characteristics.models';
import { AddObjectCharacteristicsGeneralParametersUiComponent } from '../add-object-characteristics-general-parameters-ui/add-object-characteristics-general-parameters-ui.component';
import { FormControlPipe, FormGroupPipe } from '@utils/pipes';
import { AddObjectCharacteristicsRoomsUiComponent } from '../add-object-characteristics-rooms-ui/add-object-characteristics-rooms-ui.component';
import { AddObjectCharacteristicsAmenitiesUiComponent } from '../add-object-characteristics-amenities-ui/add-object-characteristics-amenities-ui.component';
import { AddObjectCharacteristicsDescriptionUiComponent } from '../add-object-characteristics-description-ui/add-object-characteristics-description-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';

@Component({
  selector: 'account-add-object-characteristics-container',
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
    AddObjectButtonsUiComponent,
  ],
  templateUrl: './add-object-characteristics-container.component.html',
  styleUrl: './add-object-characteristics-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsContainerComponent {
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input({ required: true }) form!: FormGroup<CharacteristicsVM>;
  private readonly router = inject(Router);

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/photos');
  }
}
