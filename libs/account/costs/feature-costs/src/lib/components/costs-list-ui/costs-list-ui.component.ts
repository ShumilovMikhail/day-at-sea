import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccordionDirective } from '@utils/directives';
import { CostVM } from '../../types/costs.models';

@Component({
  selector: 'account-costs-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, RouterLink],
  templateUrl: './costs-list-ui.component.html',
  styleUrl: './costs-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostsListUiComponent {
  @Output() deleteCostEvent = new EventEmitter<number>();
  @Input({ required: true }) costs!: CostVM[];
  @Input() isMobile = false;

  public onDeleteCost(id: number): void {
    this.deleteCostEvent.emit(id);
  }
}
