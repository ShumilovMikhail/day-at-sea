import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnVM } from '../types/table-view.models';

@Component({
  selector: 'account-feature-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTableComponent {
  @Input() tableSettings: TableColumnVM[] | null = null;
  @Input({ required: true }) list!: unknown[];
}
