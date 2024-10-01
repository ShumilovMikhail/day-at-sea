import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-feature-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-statistics.component.html',
  styleUrl: './feature-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureStatisticsComponent {}
