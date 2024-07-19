import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MyObjectsTableList } from '../../types/my-objects-vm.models';

@Component({
  selector: 'account-my-objects-table-ui',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './my-objects-table-ui.component.html',
  styleUrl: './my-objects-table-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsTableUiComponent {
  @Input({ required: true }) objectsList!: MyObjectsTableList;
}
