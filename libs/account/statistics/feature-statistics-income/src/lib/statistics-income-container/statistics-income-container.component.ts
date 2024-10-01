import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-statistics-income-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-income-container.component.html',
  styleUrl: './statistics-income-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsIncomeContainerComponent {}
