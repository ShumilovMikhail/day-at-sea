import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-cost-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-cost-container.component.html',
  styleUrl: './add-cost-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCostContainerComponent {}
