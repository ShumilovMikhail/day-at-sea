import { ChangeDetectionStrategy, Component, computed, inject, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffEditTableBlockedMembersUiComponent } from '../staff-edit-table-blocked-members-ui/staff-edit-table-blocked-members-ui.component';
import { StaffEntity, StaffFacade, StaffStatusTypes } from '@account/staff/data-access-staff';
import { StaffVM } from '../../types/staff-vm.models';
import { staffMemberVMAdapter } from '../../utils/staff-member-vm.adapter';
import { StaffEditTableActiveMembersUiComponent } from '../staff-edit-table-active-members-ui/staff-edit-table-active-members-ui.component';

@Component({
  selector: 'account-staff-edit-table-container',
  standalone: true,
  imports: [CommonModule, StaffEditTableBlockedMembersUiComponent, StaffEditTableActiveMembersUiComponent],
  templateUrl: './staff-edit-table-container.component.html',
  styleUrl: './staff-edit-table-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditTableContainerComponent {
  @Input({ required: true }) currentPage!: string;
  private readonly staffFacade = inject(StaffFacade);
  private readonly staffEntity: Signal<StaffEntity | null> = this.staffFacade.staff;
  public readonly staffVM: Signal<StaffVM | null> = computed(() => {
    const staff = this.staffEntity();
    if (staff) return staff.map((staffMember) => staffMemberVMAdapter.entityToVM(staffMember));
    return null;
  });
  public changeStaffMemberStatus(id: number): void {
    const staffMember = this.staffEntity()?.find((staffMember) => staffMember.id === id);
    if (!staffMember) throw Error('Staff edit status: staff member is undefined');
    this.staffFacade.updateStaffMember({
      ...staffMember,
      status: (staffMember.status === 'active' ? 'blocked' : 'active') as StaffStatusTypes,
    });
  }
  public deleteStaffMemberStatus(id: number): void {
    const staffMember = this.staffEntity()?.find((staffMember) => staffMember.id === id);
    if (!staffMember) throw Error('Staff edit status: staff member is undefined');
    this.staffFacade.deleteStaffMember(id);
  }
}
