import { inject, Injectable, Signal } from '@angular/core';
import { filter, take } from 'rxjs';

import { StaffStore } from './staff-store';
import { AgencyFacade } from '@account/data-access-agency';
import { AddStaffMemberRequest, StaffEntity } from '../types/staff.models';

@Injectable({ providedIn: 'root' })
export class StaffFacade {
  private readonly staffStore = inject(StaffStore);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly isLoading: Signal<boolean> = this.staffStore.isLoading;
  public get staff(): Signal<StaffEntity | null> {
    if (!this.staffStore.staff$()) this.getStaff();
    return this.staffStore.staff$;
  }

  public addStaffMember(staffMember: AddStaffMemberRequest): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((id: number) => this.staffStore.addStaffMember(id, staffMember));
  }

  private getStaff(): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((id: number) => this.staffStore.getStaff(id));
  }
}
