import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-staff-edit-table-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-edit-table-container.component.html',
  styleUrl: './staff-edit-table-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditTableContainerComponent {
  @Input({ required: true }) currentPage!: string;
}
