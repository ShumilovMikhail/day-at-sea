import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-staff-edit-table-blocked-members-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-edit-table-blocked-members-ui.component.html',
  styleUrl: './staff-edit-table-blocked-members-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditTableBlockedMembersUiComponent {}
