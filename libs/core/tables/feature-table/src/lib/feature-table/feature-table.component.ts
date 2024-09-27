import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-feature-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-table.component.html',
  styleUrl: './feature-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTableComponent {}
