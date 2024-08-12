import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AddStaffMemberUiComponent } from '../add-staff-member-ui/add-staff-member-ui.component';
import { StaffEntity, StaffFacade, StaffStatusTypes } from '@account/staff/data-access-staff';
import { AddStaffMember } from '../../types/add-staff-member.models';

@Component({
  selector: 'account-staff-edit-container',
  standalone: true,
  imports: [CommonModule, AddStaffMemberUiComponent],
  templateUrl: './staff-edit-container.component.html',
  styleUrl: './staff-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditContainerComponent {
  private readonly staffFacade = inject(StaffFacade);
  public readonly isLoading: Signal<boolean> = this.staffFacade.isLoading;
  public readonly staff: Signal<StaffEntity | null> = this.staffFacade.staff;

  constructor(title: Title) {
    title.setTitle('Настройки - сотрудники');
  }

  public onAddStaffMember(staffMember: AddStaffMember): void {
    this.staffFacade.addStaffMember({ ...staffMember, status: 'activate' as StaffStatusTypes });
  }
}
