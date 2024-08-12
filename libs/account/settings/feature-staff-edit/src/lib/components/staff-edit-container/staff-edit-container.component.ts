import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AddStaffMemberUiComponent } from '../add-staff-member-ui/add-staff-member-ui.component';

@Component({
  selector: 'account-staff-edit-container',
  standalone: true,
  imports: [CommonModule, AddStaffMemberUiComponent],
  templateUrl: './staff-edit-container.component.html',
  styleUrl: './staff-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditContainerComponent {
  constructor(title: Title) {
    title.setTitle('Настройки - сотрудники');
  }
}
