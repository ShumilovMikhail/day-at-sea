import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MyObjectsTableList } from '../../types/my-objects-vm.models';

@Component({
  selector: 'account-my-objects-list-mobile-ui',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './my-objects-list-mobile-ui.component.html',
  styleUrl: './my-objects-list-mobile-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsListMobileUiComponent {
  @Input({ required: true }) objectsList!: MyObjectsTableList;
}
