import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddObjectTypeUiComponent } from '../add-object-type-ui/add-object-type-ui.component';
import { ObjectTypes } from '../types/object.models';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [CommonModule, AddObjectTypeUiComponent],
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
