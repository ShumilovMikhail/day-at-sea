import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaginationItem } from '../../types/pagination.models';

@Component({
  selector: 'account-staff-edit-pagination-ui',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-edit-pagination-ui.component.html',
  styleUrl: './staff-edit-pagination-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditPaginationUiComponent {
  @Input({ required: true }) paginationItems!: PaginationItem[];
  @Input({ required: true }) url!: string;
  @Input({ required: true }) currentPage!: string;
}
