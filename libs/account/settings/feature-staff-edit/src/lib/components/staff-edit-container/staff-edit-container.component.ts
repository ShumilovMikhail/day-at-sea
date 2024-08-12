import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AddStaffMemberUiComponent } from '../add-staff-member-ui/add-staff-member-ui.component';
import { StaffEntity, StaffFacade, StaffStatusTypes } from '@account/staff/data-access-staff';
import { AddStaffMember } from '../../types/add-staff-member.models';
import { StaffEditPaginationUiComponent } from '../staff-edit-pagination-ui/staff-edit-pagination-ui.component';
import { PaginationItem } from '../../types/pagination.models';
import { StaffEditTableContainerComponent } from '../staff-edit-table-container/staff-edit-table-container.component';

const PAGINATION_ITEMS: PaginationItem[] = [
  {
    pageParam: 'active',
    title: 'Активные',
  },
  {
    pageParam: 'blocked',
    title: 'Заблокированные',
  },
];

@Component({
  selector: 'account-staff-edit-container',
  standalone: true,
  imports: [CommonModule, AddStaffMemberUiComponent, StaffEditPaginationUiComponent, StaffEditTableContainerComponent],
  templateUrl: './staff-edit-container.component.html',
  styleUrl: './staff-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEditContainerComponent {
  private readonly staffFacade = inject(StaffFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public readonly isLoading: Signal<boolean> = this.staffFacade.isLoading;
  public readonly staff: Signal<StaffEntity | null> = this.staffFacade.staff;
  public readonly paginationItems: PaginationItem[] = PAGINATION_ITEMS;
  public currentPage = '';
  public readonly url: string = this.router.url.split('?')[0];

  constructor(title: Title) {
    title.setTitle('Настройки - сотрудники');
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.currentPage = params['page'];
    });
  }

  public onAddStaffMember(staffMember: AddStaffMember): void {
    this.staffFacade.addStaffMember({ ...staffMember, status: 'activate' as StaffStatusTypes });
  }
}
