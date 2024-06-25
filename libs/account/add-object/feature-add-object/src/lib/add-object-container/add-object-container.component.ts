import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddObjectTypeUiComponent } from '../add-object-type-ui/add-object-type-ui.component';
import { ObjectTypes } from '../types/object.models';
import { AddObjectRoomInfoUiComponent } from '../add-object-room-info-ui/add-object-room-info-ui.component';
import { AddObjectFloorInfoUiComponent } from '../add-object-floor-info-ui/add-object-floor-info-ui.component';
import { AddObjectHouseInfoUiComponent } from '../add-object-house-info-ui/add-object-house-info-ui.component';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectTypeUiComponent,
    AddObjectRoomInfoUiComponent,
    AddObjectFloorInfoUiComponent,
    AddObjectHouseInfoUiComponent,
  ],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent {
  public selectedType: ObjectTypes | null = null;

  public onSelectType(type: ObjectTypes): void {
    this.selectedType = type;
  }
}
