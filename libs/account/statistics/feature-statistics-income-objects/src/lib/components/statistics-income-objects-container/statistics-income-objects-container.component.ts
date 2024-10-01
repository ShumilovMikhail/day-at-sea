import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsIncomeObjectsService } from '../../services/statistics-income-objects.service';

@Component({
  selector: 'account-statistics-income-objects-container',
  standalone: true,
  imports: [CommonModule],
  providers: [StatisticsIncomeObjectsService],
  templateUrl: './statistics-income-objects-container.component.html',
  styleUrl: './statistics-income-objects-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsIncomeObjectsContainerComponent {
  private readonly statisticsIncomeObjectService = inject(StatisticsIncomeObjectsService);
}
