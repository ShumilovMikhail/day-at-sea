import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionDirective } from '@utils/directives';
import { MoveVM } from '../../types/moving.models';

@Component({
  selector: 'account-move-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective],
  templateUrl: './move-list-ui.component.html',
  styleUrl: './move-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListUiComponent {
  @Input({ required: true }) moving!: MoveVM[];
  @Input() isMobile = false;
}
