import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ObjectTypes } from '../types/object.models';
import { AddObjectInfoTypeUiComponent } from '../add-object-info-type-ui/add-object-info-type-ui.component';
import { AddObjectInfoRoomUiComponent } from '../add-object-info-room-ui/add-object-info-room-ui.component';
import { AddObjectInfoFlatUiComponent } from '../add-object-info-flat-ui/add-object-info-flat-ui.component';
import { AddObjectInfoHouseUiComponent } from '../add-object-info-house-ui/add-object-info-house-ui.component';
import { Router } from '@angular/router';

@Component({
  selector: 'account-add-object-info-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectInfoHouseUiComponent,
    AddObjectInfoFlatUiComponent,
    AddObjectInfoRoomUiComponent,
    AddObjectInfoTypeUiComponent,
  ],
  templateUrl: './add-object-info-container.component.html',
  styleUrl: './add-object-info-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfoContainerComponent {
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input({ required: true }) addressControl!: FormControl<string>;
  @Input({ required: true }) placementTypeControl!: FormControl<string>;
  private readonly router = inject(Router);
  public selectedType: ObjectTypes | null = null;

  public onSelectType(type: ObjectTypes): void {
    this.selectedType = type;
    this.addressControl.patchValue('');
  }

  public onNext(): void {
    this.router.navigate(['/account/add-object/infrastructure']);
  }
}
