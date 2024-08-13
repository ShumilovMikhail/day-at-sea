import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffVM } from '../../types/staff-vm.models';
import { AccordionDirective, IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-staff-edit-table-active-members-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, IsMobileDirective],
  templateUrl: './staff-edit-table-active-members-ui.component.html',
  styleUrl: './staff-edit-table-active-members-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditTableActiveMembersUiComponent {
  @Output() statusButtonClickEvent = new EventEmitter<number>();
  @Output() deleteButtonClickEvent = new EventEmitter<number>();
  public staffVM = input<StaffVM>();
  public readonly staffActive: Signal<StaffVM | null> = computed(() => {
    const staff = this.staffVM();
    return staff ? staff.filter((staffMember) => staffMember.status === 'active') : null;
  });
  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) this.isMobile = isMobile;
  }

  public onStatusButtonClick(id: number): void {
    this.statusButtonClickEvent.emit(id);
  }

  public onDeleteButtonClick(id: number): void {
    this.deleteButtonClickEvent.emit(id);
  }
}
