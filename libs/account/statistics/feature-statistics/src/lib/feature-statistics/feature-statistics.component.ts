import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsIncomeObjectsContainerComponent } from '@account/statistics/feature-statistics-income-objects';

@Component({
  selector: 'account-feature-statistics',
  standalone: true,
  imports: [CommonModule, StatisticsIncomeObjectsContainerComponent],
  templateUrl: './feature-statistics.component.html',
  styleUrl: './feature-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureStatisticsComponent {}
