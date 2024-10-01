import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsIncomeContainerComponent } from '@account/statistics/feature-statistics-income';

@Component({
  selector: 'account-feature-statistics',
  standalone: true,
  imports: [CommonModule, StatisticsIncomeContainerComponent],
  templateUrl: './feature-statistics.component.html',
  styleUrl: './feature-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureStatisticsComponent {}
