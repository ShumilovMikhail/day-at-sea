import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectTypes } from '../types/object.models';

@Component({
  selector: 'account-add-object-type-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-object-type-ui.component.html',
  styleUrl: './add-object-type-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectTypeUiComponent {
  @Output() selectTypeEvent = new EventEmitter<ObjectTypes>();
  @Input() selectedType: ObjectTypes | null = null;

  public onSelectType(type: string): void {
    this.selectTypeEvent.emit(type as ObjectTypes);
  }
}
